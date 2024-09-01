# userinfo-ap01-spring

### プロジェクト作成
Spring initializrを使用
- **Project Type**: Spring Boot
- **Build Tool**: Maven Project
- **Spring Boot Version**: 3.3.3
- **Project Language**: Java
- **Group**: com.local
- **Artifact Id**: userinfo-ap01-spring
- **Packaging Type**: Jar
- **Java Version**: 17
- **Dependencies**: 
  - Spring Web
  - Spring Data JPA
  - Spring for GraphQL
  - PostgreSQL Driver

作成後、VS Codeを再起動します。しばらくするとSpring Dashboardに反映されます。反映されない場合は、10分程度待ちます。
Spring Dashboardからアプリの起動・停止が可能です。

> **注意**  
> Spring Dashboardへ反映されない場合、mainメソッドを持つファイルから起動することは可能ですが、「SpringApplication cannot be resolved」というエラーが発生することがあります。  
> 調査の結果、5階層以下のフォルダ直下のプロジェクトは認識されますが、6階層以上の場合は認識されません。  
> 引き続き「SpringApplication cannot be resolved」が発生している場合は、対象ファイルのエンコードが「UTF-8 with BOM」となっている可能性がある。
> 下記手順により「UTF-8 without BOM」へ変更する。
> 1. コマンドパレットを使用する方法
> 1-1. コマンドパレットを開く
> ・キーボードショートカット Ctrl + Shift + P（Windows/Linux）または Cmd + Shift + P（macOS）を押して、コマンドパレットを開きます。
> 1-2. エンコーディングを変更
> ・コマンドパレットに Change File Encoding と入力し、「Change File Encoding」を選択します。
> 1-3. 現在のエンコーディングを確認
> ・現在のファイルのエンコーディングが表示されます。
> 1-4. UTF-8 without BOMで再保存
> ・「Save with Encoding」を選択し、次に「UTF-8」を選びます。この際、「UTF-8 without BOM」が自動的に適用されます。
> 2. VS Code設定からエンコーディングを設定する方法
> 2-1. 設定を開く
> ・Ctrl + ,（Windows/Linux）または Cmd + ,（macOS）を押してVS Codeの設定を開きます。
> 2-2. エンコーディング設定を検索
> ・検索バーに files.encoding と入力し、表示されるオプションからエンコーディングを設定できます。
> 2-3. UTF-8 without BOMで保存
> ・「files.encoding」を「utf8」に設定してファイルを保存します。

### ファイル構成
```
src/
├─main/
│  ├─java/
│  │  └─com/
│  │      └─local/
│  │          └─userinfo_ap01_spring/
│  │              ├─config/
│  │              │ └─ WebConfig.java
│  │              ├─model/
│  │              │ └─ User.java
│  │              ├─repository/
│  │              │ └─ UserRepository.java
│  │              └─resolver/
│  │                 └─ UserResolver.java
│  └─resources/
│      ├─graphql/
│      │ └─ schema.graphqls
│      └─ application.properties
└─test/
│   └─java/
│       └─com/
│           └─local/
│               └─userinfo_ap01_spring/
│                   └─repository/
│                      └─ UserRepositoryTest.java
├─ UserinfoAp01SpringApplication.java
```
- **src/main/java/com/local/userinfo_ap01_spring/config/WebConfig.java**: SpringのCORS設定
- **src/main/java/com/local/userinfo_ap01_spring/model/User.java**: ユーザエンティティの定義
- **src/main/java/com/local/userinfo_ap01_spring/repository/UserRepository.java**: データ検索向けRepositoryインターフェイス
- **src/main/java/com/local/userinfo_ap01_spring/resolver/UserResolver.java**: GraphQLリゾルバ
- **src/main/resources/graphql/schema.graphqls**: GraphQLスキーマ
- **src/main/resources/application.properties**: application.propertiesファイル
- **src/test/java/com/local/userinfo_ap01_spring/repository/UserRepositoryTest.java**: `UserRepository.java`のテスト
- **src/UserinfoAp01SpringApplication.java**: 全体のアプリケーションロジックを統括

### 使用手順

詳細は、`README.md`の説明を参照してください。

### GraphiQLを使用した動作確認

Spring実行後、以下のURLにアクセスします。

```
http://localhost:8081/graphiql
```

##### Query(ユーザ一覧)
```graphql
query {
  users {
    id
    name
    address
  }
}
```

##### Mutation(ユーザ追加)
```graphql
mutation {
  addUser(name: "Taro Yamada", address: "11-1-1 Tokyo Japan") {
    id
    name
    address
  }
}
```

### curlを使用した動作確認

##### Query(ユーザ一覧)
```bash
curl -X POST http://localhost:8081/graphql -H "Content-Type: application/json" -d "{\"query\": \"{ users { id name address } }\"}"
```

##### Mutation(ユーザ追加)
```bash
curl -X POST http://localhost:8081/graphql -H "Content-Type: application/json" -d "{\"query\": \"mutation { addUser(name: \\\"Taro Yamada\\\", address: \\\"11-1-1 Tokyo Japan\\\") { id name address } }\"}"
```