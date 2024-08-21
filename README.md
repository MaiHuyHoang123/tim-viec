Link web demo [https://crawler-job.cocatvn2003.workers.dev/](https://crawler-job.cocatvn2003.workers.dev/)
## Các bước triển khai lên cloudflare
1. đăng ký tài khoản cloudflare,sau đó đăng nhập và chọn vào workers & pages.Nếu đã tạo workers trước đó thì chuyển sang bước 2.
Chọn create workers

![image](https://github.com/user-attachments/assets/924a4ce2-61fc-4b55-bde6-03f49384c094)
chọn deploy

![image](https://github.com/user-attachments/assets/e2855900-c2bf-4997-b9cb-f3c829ca44ab)

2. tại giao diện D1 chọn create

![image](https://github.com/user-attachments/assets/598010de-3ed6-487f-a720-15b35b79207e)

nhập tên database rồi ấn create

![image](https://github.com/user-attachments/assets/ceda7717-3394-4448-aa75-a886791f3b06)

nhấn vào database vừa chọn ấn copy đoạn mã sau

![image](https://github.com/user-attachments/assets/0db32380-cd0b-4a1b-9f3d-7276499518ee)

3. Di chuyển vào thư mục code đã clone về.Mở file wrangler.toml

![image](https://github.com/user-attachments/assets/8d3f9d77-fe59-46ab-a4f0-f66ef87cf617)

nhập lệnh npm install wrangler --save-dev

Nhập lệnh sau vào terminal "npx wrangler d1 execute example-db --remote --file=database.sql" (**chú ý**:thay example-db bằng tên database vừa tạo)

![image](https://github.com/user-attachments/assets/8dcb08b4-e7ac-4174-92c0-9694462edbfe)

thông báo trên terminal " This process may take some time, during which your D1 database will be unavailable to serve queries.
  Ok to proceed? » (Y/n)" thì nhập y

nhập lệnh npm run deploy

4. quay về trang workers & pages chọn visit site vừa deploy

![image](https://github.com/user-attachments/assets/48708f77-8c85-4c25-840a-eec82663704f)

Hiển thị trang chủ trang web tức là đã deploy thành công


