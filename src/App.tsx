import { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  Paper,
  Text,
  Title,
  Alert,
  Stack,
  Image,
} from "@mantine/core";
import { recognize } from "./recognition";
import { canShare, copy, share } from "./share";
interface Result {
  text: string;
  valid: boolean;
}
export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [status, setStatus] = useState<"idle" | "reading" | "ready" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const seq = useRef(0);
  useEffect(
    () => () => {
      seq.current++;
    },
    [],
  );
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);
  async function run(f: File) {
    const id = ++seq.current;
    setFile(f);
    setResult(null);
    setMessage("");
    setStatus("reading");
    try {
      const value = await recognize(f);
      if (id !== seq.current) return;
      if (!value) {
        setStatus("error");
        setMessage("コードを読み取れませんでした。");
        return;
      }
      setResult(value);
      setStatus("ready");
    } catch {
      if (id !== seq.current) return;
      setStatus("error");
      setMessage("読み取りに失敗しました。再試行してください。");
    }
  }
  function choose(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (f.type !== "image/jpeg") {
      seq.current++;
      setFile(null);
      setResult(null);
      setStatus("error");
      setMessage("JPEG 画像を選択してください。");
      return;
    }
    void run(f);
  }
  async function onShare() {
    if (!file || !result) return;
    try {
      await share(file, result.text);
    } catch {
      setMessage("共有に失敗しました。再試行してください。");
    }
  }
  async function onCopy() {
    if (!result) return;
    try {
      await copy(result.text);
      setMessage("コードをコピーしました。");
    } catch {
      setMessage("コピーに失敗しました。再試行してください。");
    }
  }
  return (
    <Container size="sm" py="xl">
      <header>
        <Text c="orange" fw={800} size="sm">
          SALMON RUN / SCENARIO
        </Text>
        <Title order={1}>シナリオコードを読み取る</Title>
        <Text c="dimmed" mt="sm">
          バイトシナリオのスクリーンショットを選んで、コードと画像を共有できます。
        </Text>
      </header>
      <main>
        <Paper withBorder p="lg" mt="xl" radius="md">
          <Stack>
            <label className="file-button">
              {file ? "別の画像を選択" : "画像を選択"}
              <input
                data-testid="image-input"
                aria-label="画像を選択"
                type="file"
                accept="image/jpeg"
                onChange={choose}
              />
            </label>
            <Text size="sm" c="dimmed">
              Nintendo Switch で撮影した JPEG 画像を選択してください。
            </Text>
            {preview && (
              <Image
                src={preview}
                alt="選択したバイトシナリオ画像"
                radius="sm"
              />
            )}
            <div role="status" aria-live="polite">
              {status === "reading" ? "読み取り中…" : ""}
              {status === "ready" && result && (
                <>
                  <Text size="sm">シナリオコード</Text>
                  <Text className="code" fw={800} size="xl">
                    {result.text}
                  </Text>
                </>
              )}
            </div>
            {result && !result.valid && (
              <Alert role="alert" color="yellow">
                コードの形式が一致しません。画像と照らし合わせてください。
              </Alert>
            )}
            {message && (
              <Alert
                role={
                  status === "error" || message.includes("失敗")
                    ? "alert"
                    : "status"
                }
                color={message.includes("コピーしました") ? "teal" : "red"}
              >
                {message}
              </Alert>
            )}
            {status === "error" && file && (
              <Button data-testid="retry" onClick={() => void run(file)}>
                再試行
              </Button>
            )}
            {status === "ready" &&
              file &&
              result &&
              (canShare(file) ? (
                <Button data-testid="share" onClick={() => void onShare()}>
                  画像とコードを共有
                </Button>
              ) : (
                <Button data-testid="copy" onClick={() => void onCopy()}>
                  コードをコピー
                </Button>
              ))}
          </Stack>
        </Paper>
      </main>
    </Container>
  );
}
