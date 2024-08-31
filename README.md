## システム概要
- **ユーザ情報管理システム**
- Web UIを通じて、登録されたユーザ情報の一覧を表示、およびユーザ情報の登録・削除を行う
- **構成**
  - **Webサーバ**: React
  - **APサーバ**: Spring(Java)
  - **DBサーバ**: PostgreSQL
  - **補足**
    - Web(ブラウザ)～AP間の連携はAPI(GraphQL)を使用

## 要件
- **機能要件**
  - クライアントはUIを通して、ユーザ情報(ユーザID、ユーザー名、住所)の操作を行う
  - **操作可能な内容**:
    - 全ユーザ情報の一覧の取得。表形式で表示
    - 新規ユーザ(1人)の登録・削除
- **構成**
  - **DBサーバ**:
    - ユーザ情報(番号、名前、住所)を格納
    - PostgreSQL(バージョン14+238)を使用 ※設定詳細は後述参照
  - **UI(Webサーバ)**:
    - React(バージョン18)を使用
  - **APサーバ**:
    - Spring(バージョン3.3.3、OpenJDK バージョン21、管理ツール: Maven)を使用
    - APIはGraphQLを使用
  - **開発環境**
    - 開発端末:
      - Windows 10 PC
      - 各サーバは本端末上で動作
        - Webサーバ: VS Codeから起動
        - APサーバ: VS Codeから起動
        - DBサーバ: Ubuntu with WSL2から起動
    - IDE: VS Code
      - 主要プラグイン:
        - 全体: (失念)
        - React関連: (失念)
        - Spring関連:
          - Extension Pack for Java
          - Spring Boot Extension Pack
          - Lombok Annotations Support for VS Code
          - Checkstyle for Java

## 使用手順
- **DBサーバ(PostgreSQL)を起動**
  - WSL2を起動
  - 下記コマンドを投入(自動起動のため通常は不要)
    ```bash
    service postgresql start
    service postgresql status
    ```
- **APサーバ(Spring)を起動**
  - VS Code左タイルの[Spring Boot Dashbord]をクリック
  - [APPS]-[userinfo-ap01-spring]を選択しRunアイコンをクリック
- **Reactを起動**
  - VS Codeのターミナルから「react-spring-graphql-postgresql\react\userinfo-wb01-react」へ移動後に`npm start`を実行
- **操作**
  - ブラウザから`http://localhost:3000`へアクセス
  - **ユーザ一覧**: ページを開くと自動でID, 名前, 住所を持つ複数のユーザ一覧を表示
  - **ユーザ登録**: 名前, 住所を用いて1名登録
  - **ユーザ削除**: IDを用いて1名削除

## PostgreSQLについて
### [WSL] インストール
参考：<https://learn.microsoft.com/ja-jp/windows/wsl/tutorials/wsl-database#install-postgresql>

```bash
sudo apt install postgresql postgresql-contrib
# 管理者ユーザー postgresへパスワードの割り当て
sudo passwd postgres # password
# 接続
sudo -u postgres psql
```

### [WSL] の初期設定
- **設定ファイルの更新(pgAdminからの接続許可)**
  参考：<https://zenn.dev/takajun/articles/468b17a3150a8d#1.-postgresql-%E8%A8%AD%E5%AE%9A%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E6%9B%B4%E6%96%B0>

  ```bash
  # root(sudo su -)へ変更後、修正
  vi /etc/postgresql/14/main/pg_hba.conf
  ※ファイルが存在しない場合は対応不要
  ```
  - **前**: `host all all 127.0.0.1/32 scram-sha-256`
  - **後**: `host all all 0.0.0.0/0 trust`

  ```bash
  vi /etc/postgresql/14/main/postgresql.conf
  ※ファイルが存在しない場合は対応不要
  ```
  - **前**: `#listen_addresses = 'localhost'`
  - **後**: `listen_addresses = '*'`

  ```bash
  service postgresql restart
  ```

- **DB、テーブル作成**
  ```bash
  sudo -u postgres psql
  ```

  ```sql
  \l
  CREATE DATABASE userdb01;
  \l
  \c userdb01
  \d
  CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      address VARCHAR(255)
  );
  \d users
  INSERT INTO users (name, address) VALUES ('Leanne Graham', 'Kulas Light pt. 556 Gwenborough');
  INSERT INTO users (name, address) VALUES ('Ervin Howell', 'Victor Plains Suite 879 Wisokyburgh');
  INSERT INTO users (name, address) VALUES ('Clementine Bauch', 'Douglas Extension Suite 847 McKenziehaven');
  SELECT * FROM users;
  \q
  ```

### [PC] (任意)pgAdmin 4 (PostgreSQL 用 GUI 管理ツール) のインストール、接続
参考：<https://www.sraoss.co.jp/tech-blog/pgsql/pgadmin4/>

### 追加サンプルデータ用100件
※下記名前・住所は存在しない仮想の情報
```sql
INSERT INTO users (name, address) VALUES ('Leanne Graham', 'Kulas Light pt. 556 Gwenborough');
INSERT INTO users (name, address) VALUES ('山田 太郎', '東京都新宿区1-1-1');
INSERT INTO users (name, address) VALUES ('Clementine Bauch', 'Douglas Extension Suite 847 McKenziehaven');
INSERT INTO users (name, address) VALUES ('鈴木 花子', '大阪府大阪市中央区2-2-2');
INSERT INTO users (name, address) VALUES ('Chelsey Dietrich', 'Skiles Walks Suite 351 Roscoeview');
INSERT INTO users (name, address) VALUES ('田中 次郎', '福岡県福岡市博多区3-3-3');
INSERT INTO users (name, address) VALUES ('Kurtis Weissnat', 'Rex Trail Suite 280 Howemouth');
INSERT INTO users (name, address) VALUES ('John Doe', 'Main Street 123 Springfield');
INSERT INTO users (name, address) VALUES ('佐藤 三郎', '北海道札幌市北区4-4-4');
INSERT INTO users (name, address) VALUES ('Ervin Howell', 'Victor Plains Suite 879 Wisokyburgh');
INSERT INTO users (name, address) VALUES ('Emily Davis', 'Maple Drive 1010 Seaview');
INSERT INTO users (name, address) VALUES ('山本 美咲', '神奈川県横浜市港北区5-5-5');
INSERT INTO users (name, address) VALUES ('Michael Brown', 'Cedar Road 1111 Brookside');
INSERT INTO users (name, address) VALUES ('高橋 健太', '京都府京都市左京区6-6-6');
INSERT INTO users (name, address) VALUES ('David Jones', 'Birch Lane 1313 Meadowland');
INSERT INTO users (name, address) VALUES ('鈴木 一郎', '愛知県名古屋市中村区7-7-7');
INSERT INTO users (name, address) VALUES ('Joshua Moore', 'Cherry Avenue 1515 Riverbend');
INSERT INTO users (name, address) VALUES ('小林 花', '埼玉県さいたま市浦和区8-8-8');
INSERT INTO users (name, address) VALUES ('Anthony Lee', 'Ridge Road 2121 Summitview');
INSERT INTO users (name, address) VALUES ('Mia Walker', 'Valley Road 2222 Riverwood');
INSERT INTO users (name, address) VALUES ('渡辺 陽子', '千葉県千葉市中央区9-9-9');
INSERT INTO users (name, address) VALUES ('Andrew Scott', 'Mountain Road 2525 Highlands');
INSERT INTO users (name, address) VALUES ('Amelia King', 'Lakeshore Drive 2626 Bayview');
INSERT INTO users (name, address) VALUES ('佐々木 幸子', '広島県広島市中区10-10-10');
INSERT INTO users (name, address) VALUES ('William Baker', 'Meadow Lane 2727 Meadowbrook');
INSERT INTO users (name, address) VALUES ('Evelyn Wright', 'Sunset Boulevard 2828 Westview');
INSERT INTO users (

name, address) VALUES ('中村 薫', '岡山県岡山市北区11-11-11');
INSERT INTO users (name, address) VALUES ('Charlotte Green', 'Elm Street 3030 Greenville');
INSERT INTO users (name, address) VALUES ('佐藤 実', '神奈川県横浜市西区12-12-12');
INSERT INTO users (name, address) VALUES ('Henry Martinez', 'Pine Avenue 3131 Hilltop');
INSERT INTO users (name, address) VALUES ('Grace Johnson', 'River Road 3232 Woodridge');
INSERT INTO users (name, address) VALUES ('伊藤 直子', '愛媛県松山市13-13-13');
INSERT INTO users (name, address) VALUES ('Benjamin Carter', 'High Street 3333 Brookside');
INSERT INTO users (name, address) VALUES ('Sophia Hill', 'Oak Street 3434 Lakewood');
INSERT INTO users (name, address) VALUES ('佐々木 祐介', '福井県福井市14-14-14');
INSERT INTO users (name, address) VALUES ('Liam Adams', 'Cypress Lane 3535 Parkview');
INSERT INTO users (name, address) VALUES ('Emma Collins', 'Birchwood Drive 3636 Lakeside');
INSERT INTO users (name, address) VALUES ('高橋 亜美', '愛知県豊橋市15-15-15');
INSERT INTO users (name, address) VALUES ('Daniel Wilson', 'Willow Way 3737 Greenfield');
INSERT INTO users (name, address) VALUES ('Isabella Young', 'Maple Avenue 3838 Oakridge');
INSERT INTO users (name, address) VALUES ('村上 和也', '大阪府豊中市16-16-16');
INSERT INTO users (name, address) VALUES ('Noah Thompson', 'Sycamore Street 3939 Hillcrest');
INSERT INTO users (name, address) VALUES ('Olivia White', 'Magnolia Drive 4040 Cedarwood');
INSERT INTO users (name, address) VALUES ('藤田 真由', '石川県金沢市17-17-17');
INSERT INTO users (name, address) VALUES ('Lucas Turner', 'Juniper Lane 4141 Maplewood');
INSERT INTO users (name, address) VALUES ('Harper Thomas', 'Aspen Road 4242 Riverview');
INSERT INTO users (name, address) VALUES ('松本 里奈', '静岡県浜松市18-18-18');
INSERT INTO users (name, address) VALUES ('Alexander Harris', 'Spruce Lane 4343 Summitview');
INSERT INTO users (name, address) VALUES ('Avery Lewis', 'Cedar Street 4444 Westwood');
INSERT INTO users (name, address) VALUES ('小林 悠', '新潟県新潟市19-19-19');
INSERT INTO users (name, address) VALUES ('James Walker', 'Willow Road 4545 Brookside');
INSERT INTO users (name, address) VALUES ('Scarlett Brown', 'Birchwood Street 4646 Highland');
INSERT INTO users (name, address) VALUES ('青木 敦子', '長野県長野市20-20-20');
INSERT INTO users (name, address) VALUES ('William Harris', 'Maple Drive 4747 Riverwood');
INSERT INTO users (name, address) VALUES ('Sophie Robinson', 'Pine Lane 4848 Lakeside');
INSERT INTO users (name, address) VALUES ('渡辺 修', '山口県下関市21-21-21');
INSERT INTO users (name, address) VALUES ('Lily Parker', 'Oak Avenue 4949 Cedarwood');
INSERT INTO users (name, address) VALUES ('Jack Allen', 'Elm Road 5050 Meadowview');
INSERT INTO users (name, address) VALUES ('前田 由美', '群馬県高崎市22-22-22');
INSERT INTO users (name, address) VALUES ('Michael Hill', 'Cypress Lane 5151 Woodridge');
INSERT INTO users (name, address) VALUES ('Ella Murphy', 'Juniper Street 5252 Hilltop');
INSERT INTO users (name, address) VALUES ('佐藤 和子', '滋賀県大津市23-23-23');
INSERT INTO users (name, address) VALUES ('Ethan Wright', 'Sycamore Road 5353 Summitview');
INSERT INTO users (name, address) VALUES ('Ava Mitchell', 'Pine Avenue 5454 Cedarwood');
INSERT INTO users (name, address) VALUES ('田中 亮', '島根県松江市24-24-24');
INSERT INTO users (name, address) VALUES ('Jack Taylor', 'Magnolia Drive 5555 Highland');
INSERT INTO users (name, address) VALUES ('Zoe Davis', 'Cedar Street 5656 Brookside');
INSERT INTO users (name, address) VALUES ('加藤 一', '富山県富山市25-25-25');
INSERT INTO users (name, address) VALUES ('Madison Clark', 'Maple Lane 5757 Oakridge');
INSERT INTO users (name, address) VALUES ('Mason Evans', 'Willow Way 5858 Parkview');
INSERT INTO users (name, address) VALUES ('高橋 美咲', '山形県山形市26-26-26');
INSERT INTO users (name, address) VALUES ('Sophia Anderson', 'Birch Street 5959 Lakeside');
INSERT INTO users (name, address) VALUES ('Sebastian Turner', 'Elm Avenue 6060 Hillcrest');
INSERT INTO users (name, address) VALUES ('佐々木 諒', '栃木県宇都宮市27-27-27');
INSERT INTO users (name, address) VALUES ('Emily Rivera', 'Cedar Road 6161 Summitview');
INSERT INTO users (name, address) VALUES ('Mia James', 'Juniper Lane 6262 Cedarwood');
INSERT INTO users (name, address) VALUES ('鈴木 恵美', '鹿児島県鹿児島市28-28-28');
INSERT INTO users (name, address) VALUES ('Matthew Martinez', 'Oak Street 6363 Highland');
INSERT INTO users (name, address) VALUES ('Aiden Scott', 'Maple Avenue 6464 Lakeside');
INSERT INTO users (name, address) VALUES ('田中 和也', '奈良県奈良市29-29-29');
INSERT INTO users (name, address) VALUES ('Isabella White', 'Willow Road 6565 Brookside');
INSERT INTO users (name, address) VALUES ('Mason Lewis', 'Sycamore Street 6666 Woodridge');
INSERT INTO users (name, address) VALUES ('斎藤 花子', '兵庫県神戸市30-30-30');
INSERT INTO users (name, address) VALUES ('Lily Wilson', 'Pine Drive 6767 Summitview');
INSERT INTO users (name, address) VALUES ('Alexander Turner', 'Magnolia Street 6868 Cedarwood');
INSERT INTO users (name, address) VALUES ('小林 陽子', '宮城県仙台市31-31-31');
INSERT INTO users (name, address) VALUES ('Emily Thomas', 'Birch Avenue 6969 Riverwood');
INSERT INTO users (name, address) VALUES ('Benjamin Young', 'Willow Lane 7070 Meadowview');
INSERT INTO users (name, address) VALUES ('伊藤 晴子', '熊本県熊本市32-32-32');
INSERT INTO users (name, address) VALUES ('Avery Walker', 'Elm Road 7171 Summitview');
INSERT INTO users (name, address) VALUES ('Lucas Robinson', 'Cedar Avenue 7272 Lakeside');
INSERT INTO users (name, address) VALUES ('加藤 太郎', '香川県高松市33-33-33');
INSERT INTO users (name, address) VALUES ('Emma Harris', 'Maple Lane 7373 Highland');
INSERT INTO users (name, address) VALUES ('Mia Brown', 'Pine Avenue 7474 Brookside');
INSERT INTO users (name, address) VALUES ('高橋 真由', '秋田県秋田市34-34-34');
INSERT INTO users (name, address) VALUES ('James Anderson', 'Cypress Street 7575 Parkview');
INSERT INTO users (name, address) VALUES ('Charlotte Miller', 'Juniper Drive 7676 Cedarwood');
INSERT INTO users (name, address) VALUES ('鈴木 次郎', '岐阜県岐阜市35-35-35');
INSERT INTO users (name, address) VALUES ('Olivia Rodriguez', 'Magnolia Avenue 7777 Meadowview');
INSERT INTO users (name, address) VALUES ('Liam Johnson', 'Sycamore Lane 7878 Riverwood');
INSERT INTO users (name, address) VALUES ('佐々木 俊介', '大分県大分市36-36-36');
```