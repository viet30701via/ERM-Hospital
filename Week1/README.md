📘Ngày 1: Web Architecture và HTTP/RESTful API
Mục tiêu ngày: Hiểu rõ cách web hoạt động từ client đến server, nắm khái niệm API.
Nội dung lý thuyết:
Web architecture: Client (browser/frontend) ↔ Server (backend) ↔ Database.
HTTP/HTTPS: Request methods (GET, POST, PUT, DELETE), status codes (200, 404, 500), headers.
RESTful API: Nguyên tắc thiết kế API (resources, endpoints, stateless).
Tài liệu gợi ý:
MDN: "How the Web works".
Video: "HTTP Crash Course" trên Traversy Media (YouTube).
Bài đọc: "REST API Tutorial" trên restfulapi.net.
Thực hành và Bài tập EMR:
Mở DevTools browser (F12), xem tab Network khi truy cập một website (ví dụ: google.com) để quan sát requests/responses.
Dùng curl hoặc Postman thử gửi GET request đến một API public (ví dụ: https://jsonplaceholder.typicode.com/users).
Tạo file README.md cho dự án EMR, mô tả ngắn gọn architecture (Client: React/NextJS → API: NestJS → DB: MongoDB).
📘Ngày 2: JavaScript Fundamentals - Data Types, Scope, Hoisting
Mục tiêu ngày: Nắm vững kiểu dữ liệu và cách JS xử lý biến.
Nội dung lý thuyết:
Data types: Primitive (string, number, boolean, null, undefined, symbol, bigint) vs Reference (object).
Scope: Global, function, block scope (let/const vs var).
Hoisting: Biến và function declarations được "nâng lên".
Tài liệu gợi ý:
JavaScript.info: Chapters "Data types", "Variables", "Hoisting".
Video: "JavaScript Scope & Hoisting" trên freeCodeCamp.
Thực hành và Bài tập EMR:
Viết script JS cơ bản trong file patient-data.js:
Khai báo danh sách bệnh nhân ban đầu: let patients = [{ id: '1', name: 'Nguyễn Văn A', age: 30 }];
Thử nghiệm scope: Viết function với var/let/const để thấy sự khác biệt.
Chạy bằng Node.js: node patient-data.js.
Tạo repo GitHub mới tên "emr-hospital", clone về local.
📘Ngày 3: JavaScript - Functions và Arrow Functions
Mục tiêu ngày: Thành thạo cách viết và sử dụng hàm trong JS.
Nội dung lý thuyết:
Function declaration, expression, arrow function.
Parameters: Default, rest parameters.
Closure và IIFE (Immediately Invoked Function Expression).
Tài liệu gợi ý:
MDN: "Functions".
Video: "JavaScript Functions Complete Tutorial" trên Web Dev Simplified.
Thực hành và Bài tập EMR:
Tạo module patients.js:
Viết function addPatient(patients, newPatient) trả về array mới (không mutate).
Viết arrow function updatePatient(patients, id, updates).
Test các function với console.log.
Git thực hành: git init (nếu chưa), add README.md và patients.js, commit đầu tiên với message chuẩn: "feat: init project and add patient module".
📘Ngày 4: JavaScript - Array, Object, Map
Mục tiêu ngày: Làm chủ các cấu trúc dữ liệu phổ biến.
Nội dung lý thuyết:
Array methods: map, filter, reduce, find, some/every.
Object: Destructuring, spread operator, Object.keys/values/entries.
Map và Set: Khi nào dùng thay Array/Object.
Tài liệu gợi ý:
JavaScript.info: "Arrays", "Objects", "Map and Set".
Video: "JavaScript Array Methods" trên Fireship.
Thực hành và Bài tập EMR:
Hoàn thiện module patients.js:
deletePatient(patients, id): dùng filter.
searchPatient(patients, keyword): tìm theo name hoặc id (dùng some/find).
Sử dụng Map để lưu patients theo id làm key cho truy cập nhanh.
Git: Tạo branch feature/patient-crud, commit các thay đổi: "feat: implement add, update, delete, search patient functions".
📘Ngày 5: JavaScript - Async/Await và Promise
Mục tiêu ngày: Xử lý bất đồng bộ – kỹ năng quan trọng cho full-stack.
Nội dung lý thuyết:
Callback → Promise → Async/Await.
Promise methods: all, race, allSettled.
Error handling với try/catch trong async.
Tài liệu gợi ý:
MDN: "Promises", "Async/Await".
Video: "Async JS Crash Course" trên Traversy Media.
Thực hành và Bài tập EMR:
Simulate API call: Viết function fetchPatients() trả về Promise resolve danh sách bệnh nhân sau 1 giây (setTimeout).
Viết async function displayPatients() dùng await để lấy và log dữ liệu.
Thêm error handling giả lập.
Git: Commit trên branch hiện tại: "feat: add async patient fetch simulation".
📘Ngày 6: Git Cơ Bản đến Nâng Cao
Mục tiêu ngày: Thành thạo các lệnh Git hàng ngày.
Nội dung lý thuyết:
git init/clone, add, commit, status, log.
Branch: create, checkout, delete.
Merge vs Rebase.
Remote: push, pull, fetch.
Tài liệu gợi ý:
Git official docs: "Getting Started", "Branching".
Video: "Git & GitHub Crash Course" trên freeCodeCamp.
Thực hành và Bài tập EMR:
Áp dụng Gitflow cơ bản:
Tạo branch main và develop (main là production, develop là integration).
Từ develop tạo feature/patient-crud (nếu chưa có).
Merge feature branch vào develop: git checkout develop → git merge feature/patient-crud.
Push toàn bộ lên GitHub: git push origin --all.
Thực hành resolve conflict đơn giản (tạo conflict giả).
📘Ngày 7: Git Workflow Chuyên Nghiệp và Tổng Hợp EMR
Mục tiêu ngày: Áp dụng Gitflow đầy đủ, review và chuẩn hóa commit.
Nội dung lý thuyết:
Gitflow workflow: main, develop, feature/, release/, hotfix/\*.
Commit message convention: Conventional Commits (feat:, fix:, chore:, docs:).
Best practices: Commit nhỏ, thường xuyên, viết message rõ ràng.
Tài liệu gợi ý:
Bài viết: "A successful Git branching model" (nvie.com).
Conventional Commits: conventionalcommits.org.
Thực hành và Bài tập EMR:
Hoàn thiện module patients.js với đầy đủ functions: addPatient, updatePatient, deletePatient, searchPatient.
Test toàn bộ bằng Node.js.
Git workflow:
Tạo feature/new-patient-functions nếu cần.
Commit theo chuẩn: ví dụ "feat(patient): add search and delete functions".
Merge vào develop, push lên GitHub.
Tạo Pull Request trên GitHub từ develop → main (demo quy trình review).
Review code tuần 1: Đảm bảo code sạch, có comments cần thiết.
Kết thúc tuần 1: Học viên có repo EMR trên GitHub với branch cấu trúc rõ ràng, module JS quản lý bệnh nhân cơ bản hoạt động tốt. Sẵn sàng chuyển sang TypeScript và frontend ở tuần tiếp theo. Khuyến khích push code hàng ngày và viết README cập nhật tiến độ.
