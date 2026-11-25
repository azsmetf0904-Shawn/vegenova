# SPEC.md — 功能技術規格書

> **協作說明：**
> - **Claude Code：** 負責維護本文件，並依據「4. 任務拆解」調度 `codex` 插件實作與審查。
> - **Codex Plugin：** 實作邏輯與單元測試時，必須嚴格遵守「2. 資料結構與 API 契約」的欄位命名與型別定義。
> - **Antigravity：** 執行前端與瀏覽器驗證時，以「5. 驗收標準 (Acceptance Criteria)」作為通過基準。

---

## 1. 功能目標與範圍 (Goal & Scope)
* **功能名稱：** `[待填寫]`
* **核心目標：** `[一句話說明解決什麼業務問題]`
* **影響範圍 (Target Files)：**
  * `[待填寫預計新增或修改的檔案路徑]`
* **排除範圍 (Out of Scope)：** `[明確列出本次不做的功能，避免 AI 過度發散]`

---

## 2. 資料結構與 API 契約 (Data & API Contracts)

### 2.1 資料模型 / TypeScript Interface
```ts
// 在此定義核心介面與型別
```

### 2.2 API 端點規範
* **Endpoint:** `[METHOD /api/...]`
* **成功回應 (200 OK):** `[描述回傳格式]`
* **錯誤處理：** `[列出 400 / 401 / 404 / 500 處理規範]`

---

## 3. 關鍵邏輯與邊界條件 (Logic & Edge Cases)
1. `[邊界條件 1]`
2. `[邊界條件 2]`

---

## 4. 原子化任務拆解 (Task Breakdown for Claude & Codex)
* **[Task 1] [任務名稱]**
  * 建議執行者： Claude Code（寫完跑 `/codex:review`）
  * 要求： `[具體實作要求]`
* **[Task 2] [任務名稱]**
  * 建議執行者： Codex Plugin（可用 `/codex:rescue` 派工）
  * 要求： `[具體實作要求]`

---

## 5. 驗收標準 (Acceptance Criteria for Antigravity)
* [ ] **正常流程：** `[描述正常操作的預期畫面與行為]`
* [ ] **異常攔截：** `[描述錯誤輸入或網路異常時的 UI 降級表現]`
* [ ] **RWD 檢查：** 在手機版視窗寬度（375px）下無水平溢出或破版。
