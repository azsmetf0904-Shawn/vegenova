# AGENTS.md — 多 Agent 協作憲法 (Claude Code + Codex + Antigravity)

本專案採用「雙環境三角色」協作架構。所有參與開發的 AI Agent 在修改任何檔案前，必須嚴格遵守以下分工、觸發鐵律與交接規範。

## 1. 角色與職責邊界 (Role & Boundaries)

* **Claude Code（總架構師 / 協調者）：**
  * 負責需求拆解、系統架構設計、資料庫/API 規格制定，並維護 `.agent-sync/SPEC.md`。
  * 負責調度 `codex` 插件（`/codex:rescue`、`/codex:review`）進行重型程式碼生成、除錯救援與靜態審查。
  * **禁止行為：** 不進行耗時的瀏覽器人工點擊除錯；不直接修改 Antigravity 正在驗證中的前端 UI 狀態檔。
* **Codex Plugin（救援工人 / 獨立品管員）：**
  * 由 Claude Code 透過插件喚起，負責接手棘手 Bug、演算法重構、單元測試撰寫，以及對 Claude 產出的程式碼進行第二意見審查。
* **Google Antigravity（前端實測員 / 瀏覽器與終端整合）：**
  * 負責啟動本地開發伺服器（Dev Server）、利用 Browser Sub-agent 進行真實畫面渲染檢查、RWD 排版驗證、E2E 互動點擊測試與 Console 報錯收集。
  * **禁止行為：** 發現後端 API 邏輯結構性缺陷時，不擅自大規模重構後端，應將錯誤日誌寫入 `HANDOFF.md` 交還給 Claude + Codex 處理。

---

## 2. 雙模型防卡死與品管鐵律 (Hard Rules for Claude & Codex)

Claude Code 在執行開發與除錯任務時，必須無條件遵守以下兩條觸發機制：

1. **【卡關兩次即刻救援鐵律】自動觸發 `/codex:rescue`：**
   * 當同一個報錯、測試失敗或邏輯 Bug **連續嘗試修復 2 次仍未解決**時，Claude Code **嚴禁繼續原地猜測重試**。
   * 必須立即將錯誤日誌、已嘗試過的失敗方案與相關檔案路徑整理清楚，直接呼叫 `/codex:rescue` 委派給 Codex 從底層邏輯接手排查並修復。
2. **【交接前必跑安檢鐵律】強制執行 `/codex:review`：**
   * 在任何功能模組開發完成、準備更新 `.agent-sync/HANDOFF.md` 交棒給 Antigravity（或準備 `git commit`）**之前**，必須先執行一次 `/codex:review` 進行唯讀靜態審查。
   * 若 `/codex:review` 指出高風險漏洞（如空值未處理、Race Condition、型別錯誤或安全隱患），必須先完成修補後，才允許將 `Status` 切換為 `READY_FOR_PICKUP`。

---

## 3. 強制執行工作流 (Mandatory Workflow)

1. **開工必讀：** 每次收到任務指令時，**第一步必須先讀取 `.agent-sync/HANDOFF.md`**，確認目前 `Current Owner`（目前負責者）與 `Status`（狀態）。
2. **衝突防護：** 若 `HANDOFF.md` 顯示 `Status: IN_PROGRESS` 且負責人不是你，請先向使用者確認是否強制接管，切勿直接覆蓋檔案。
3. **完工與交接檢查清單：**
   * [ ] 確認已通過 `/codex:review` 靜態審查（無未解決的嚴重問題）。
   * [ ] 更新 `.agent-sync/HANDOFF.md`（填入修改摘要、測試結果、切換 `Current Owner` 為 `Antigravity`、設定 `Status: READY_FOR_PICKUP`）。
   * [ ] 執行 `git status` 確認無遺留暫存垃圾檔案。

## 4. 編碼與品質基準
* 所有環境變數範本統一維護於 `.env.example`，嚴禁將真實 API Key 寫入程式碼或 `HANDOFF.md`。
* 每次跨工具交接前，必須確保專案可正常編譯（Build / Lint 通過）。

---

## 5. 反向交接快捷指令 (Antigravity -> Claude Code)
當使用者在 Antigravity 輸入 `/handoff-back` 或要求「**結案並回傳給 Claude**」時，請嚴格執行 `.agent/workflows/handoff-back.md` 的步驟：將測試結果與錯誤日誌寫入 `.agent-sync/HANDOFF.md`（把 `Current Owner` 改為 `Claude Code`），並透過終端機執行 `pbcopy` 與 `osascript` 自動切換視窗回終端機。
