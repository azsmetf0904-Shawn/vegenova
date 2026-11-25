---
description: 完成前端/瀏覽器測試後，將結果或 Bug 寫入 HANDOFF.md 並自動切回終端機喚醒 Claude Code
---

請依照 `AGENTS.md` 的協作規範執行反向交接：

1. **整理測試與除錯紀錄：**
   更新 `.agent-sync/HANDOFF.md`：
   - 將 `Current Owner` 改回 `Claude Code`。
   - 若測試全數通過，將 `Status` 改為 `DONE`；若發現 UI 破版、Console Error 或 API 異常，將 `Status` 改為 `BLOCKED`（或 `READY_FOR_PICKUP`）。
   - 在「4. 問題與除錯日誌」詳細記錄：報錯頁面 URL、復現步驟、Console 完整錯誤訊息、Network 狀態碼，以及相關截圖路徑。
   - 在「3. 下一棒待辦指令」明確寫出需要 Claude Code（或呼叫 `/codex:rescue`）修復的具體目標。
2. **複製喚醒詞並切回終端機（macOS 自動化）：**
   更新完檔案後，請在內建終端機執行以下指令，將交接提示詞複製到剪貼簿並切回 Terminal 視窗：
   ```bash
   printf "請讀取 .agent-sync/HANDOFF.md 中的「4. 問題與除錯日誌」，排查並修復 Antigravity 回報的問題（若卡關兩次請依 AGENTS.md 鐵律啟動 /codex:rescue）。" | pbcopy
   osascript -e 'tell application "Terminal" to activate'
   ```
