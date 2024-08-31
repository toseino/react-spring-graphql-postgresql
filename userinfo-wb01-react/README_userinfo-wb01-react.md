# userinfo-wb01-react

### プロジェクト作成
```bash
npx create-react-app userinfo-wb01-react
```

※create-react-app作成済みのGithub上のコードをCloneした場合は、下記コマンドを行うことで実行可能。
　cd userinfo-wb01-react
　npm i

### コンポーネントインストール
```bash
cd userinfo-wb01-react
npm i graphql graphql-request @react-pdf/renderer
npm install @ui5/webcomponents-react @ui5/webcomponents-fiori @ui5/webcomponents-icons
```

### 日本語フォントのインストール
- 日本語フォント「NotoSansJP-VariableFont_wght.ttf」を`public`フォルダへ保存  
  → 参照 [Noto Sans JP インストール方法](https://web-dev.hatenablog.com/entry/windows/font/noto-sans-jp/install)

### ファイル構成

```
public/
├── index.html
├── NotoSansJP-VariableFont_wght.ttf
├── robots.txt
src/
├── components/
│   ├── UserForm.jsx
│   ├── UserListPdf.jsx
│   ├── UserTable.jsx
│   ├── UserPdf.jsx
├── css/
│   └── UserForm.css
├── graphql/
│   ├── queries.js
│   ├── mutations.js
├── utils/
│   └── handleOpenPdf.js
├── App.js
├── index.js
```
- **public/index.html**: 最初にブラウザーで実行
- **public/NotoSansJP-VariableFont_wght.ttf**: react-pdf向けの日本語フォント
- **public/robots.txt**: 検索エンジンのクローラーを制御
- **src/components/UserForm.jsx**: ユーザの追加と削除に関するフォーム
- **src/components/UserListPdf.jsx**: ユーザリストをPDFとして表示するためのフォーマット
- **src/components/UserTable.jsx**: ユーザリストを表示するテーブル
- **src/components/UserPdf.jsx**: ユーザリストをPDFとして生成しダウンロード
- **src/css/UserForm.css**: UserForm.jsxのスタイルを定義
- **src/graphql/queries.js**: GraphQLのクエリを定義
- **src/graphql/mutations.js**: GraphQLのミューテーションを定義
- **src/utils/handleOpenPdf.js**: PDFを新しいタブで開くユーティリティ関数
- **src/App.js**: 全体のアプリケーションロジックを統括
- **src/index.js**: Reactアプリケーションのエントリーポイントとして機能

## 使用手順

詳細は、`userinfo`の説明を参照してください。