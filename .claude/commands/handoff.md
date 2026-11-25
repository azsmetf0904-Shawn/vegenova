請依照 `AGENTS.md` 的交接鐵律執行以下步驟：

1. **交接前安檢：** 若本次變更尚未經過審查，請先執行 `/codex:review` 確認無嚴重 Bug 或邏輯漏洞；若有發現問題請先修復。
2. **更新交接面板：** 檢查目前的 `git diff` 與修改進度，更新 `.agent-sync/HANDOFF.md`：
   - 將已完成項目與 `/codex:review` 審查結果填入「2. 最新完成進度與變更摘要」。
   - 將 `Current Owner` 改為 `Antigravity`，`Status` 改為 `READY_FOR_PICKUP`。
   - 在「3. 下一棒待辦指令」寫下具體需要 Antigravity 啟動瀏覽器測試的 URL、互動步驟與預期結果。
3. **複製喚醒詞並切換視窗（macOS 自動化）：**
   完成上述檔案寫入後，請直接透過 Bash 工具執行以下指令：
   ```bash
   printf "請讀取 AGENTS.md 與 .agent-sync/HANDOFF.md，執行指派給你的瀏覽器與前端驗證任務。" | pbcopy
   osascript -e 'tell application "Antigravity" to activate'
   ```
4. **終端機回報：** 簡短告知已完成交接、提示詞已複製到剪貼簿，並已喚醒 ��
