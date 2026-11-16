
import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const text = message.trim();
    if (!text || loading) return;

    setMessages((old) => [...old, { role: "user", text }]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://fastweb96-bot.nivosite.workers.dev/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        }
      );

      const data = await response.json();

      setMessages((old) => [
        ...old,
        {
          role: "assistant",
          text: data.reply || data.message || "پاسخی دریافت نشد.",
        },
      ]);
    } catch {
      setMessages((old) => [
        ...old,
        {
          role: "assistant",
          text: "ارتباط برقرار نشد. لطفاً دوباره تلاش کنید.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: "fixed", bottom: 90, right: 20, zIndex: 9999 }}>
      {open && (
        <div style={{
          width: 320,
          height: 420,
          maxWidth: "calc(100vw - 40px)",
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: 14,
          boxShadow: "0 4px 20px #0002",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          marginBottom: 12,
          fontFamily: "inherit"
        }}>
          <div style={{
            background: "#1677ff",
            color: "#fff",
            padding: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <strong>پشتیبانی آنلاین</strong>
            <button onClick={() => setOpen(false)} style={{
              border: 0, background: "transparent", color: "#fff",
              fontSize: 22, cursor: "pointer"
            }}>×</button>
          </div>

          <div style={{
            flex: 1, overflowY: "auto", padding: 12,
            display: "flex", flexDirection: "column", gap: 10
          }}>
            {messages.length === 0 && (
              <div style={{ color: "#666", textAlign: "center" }}>
                سلام! چطور می‌توانیم کمکتان کنیم؟
              </div>
            )}

            {messages.map((item, index) => (
              <div key={index} style={{
                alignSelf: item.role === "user" ? "flex-start" : "flex-end",
                background: item.role === "user" ? "#e8f1ff" : "#f1f1f1",
                padding: "9px 12px",
                borderRadius: 12,
                maxWidth: "85%",
                whiteSpace: "pre-wrap",
                direction: "rtl",
                color: "#222"
              }}>
                {item.text}
              </div>
            ))}

            {loading && (
              <div style={{ color: "#777", direction: "rtl" }}>
                در حال نوشتن پاسخ...
              </div>
            )}
          </div>

          <form onSubmit={(event) => {
            event.preventDefault();
            void sendMessage();
          }} style={{
            display: "flex", gap: 6, padding: 10, borderTop: "1px solid #eee"
          }}>
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="پیام خود را بنویسید..."
              style={{
                flex: 1, minWidth: 0, padding: 10,
                border: "1px solid #ddd", borderRadius: 8, direction: "rtl"
              }}
            />
            <button type="submit" disabled={loading || !message.trim()} style={{
              background: "#1677ff", color: "#fff", border: 0,
              borderRadius: 8, padding: "0 14px", cursor: "pointer"
            }}>ارسال</button>
          </form>
        </div>
      )}

      <button onClick={() => setOpen((value) => !value)} style={{
        width: 58, height: 58, borderRadius: "50%", border: 0,
        background: "#1677ff", color: "#fff", fontSize: 26,
        cursor: "pointer", boxShadow: "0 3px 12px #0003"
      }} aria-label="باز کردن پشتیبانی آنلاین">
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}
