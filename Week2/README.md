🟢Tuần 2: TypeScript & Clean Code
Mục tiêu tổng tuần: Thành thạo TypeScript để viết code an toàn, dễ bảo trì. Tập trung vào việc áp dụng TypeScript nâng cao, kết hợp với nguyên tắc SOLID và Clean Code để tối ưu hóa code frontend và backend. Giả định học viên đã nắm cơ bản JavaScript/TypeScript từ Tuần 1. Thời lượng: 7 ngày, 4-6 giờ/ngày (lý thuyết 1-2 giờ, thực hành 3-4 giờ).
Dự án thực hành: Tiếp tục xây dựng EMR (Electronic Medical Records). Học viên sẽ convert code JavaScript sang TypeScript, định nghĩa models, và áp dụng validation để đảm bảo dữ liệu an toàn.
Môi trường: Sử dụng VS Code với TypeScript compiler (tsc), Node.js. Tạo folder riêng cho tuần này trong repo EMR (branch: week-2-typescript-clean).
Tài liệu chung gợi ý:
TypeScript: Official Handbook (typescriptlang.org/docs).
Clean Code: Sách "Clean Code" của Robert C. Martin (tóm tắt trên freeCodeCamp hoặc YouTube).
SOLID: Video "SOLID Principles" trên Traversy Media.
Code examples: GitHub repos như TypeScript EMR samples (tìm trên GitHub).
Dưới đây là nội dung chi tiết theo từng ngày.
📘Ngày 1: TypeScript Core - Type vs Interface, Union và Enum
Mục tiêu ngày: Hiểu sự khác biệt giữa Type và Interface, áp dụng Union/Enum để định nghĩa dữ liệu linh hoạt.
Nội dung lý thuyết:
Type vs Interface: Interface dùng cho object shapes (có thể extend), Type dùng cho aliases phức tạp (union, intersection).
Union types: Kết hợp nhiều loại (e.g., string | number).
Enum: Định nghĩa hằng số (string/number enums), lợi ích so với const objects.
Áp dụng SOLID: Single Responsibility Principle (SRP) - Mỗi class/interface chỉ làm một việc.
Tài liệu gợi ý:
TypeScript docs: Sections on Types, Interfaces, Unions, Enums.
Video: "TypeScript Interfaces vs Types" trên YouTube ( Fireship channel).
Thực hành và Bài tập EMR:
Convert một module JavaScript đơn giản (từ Tuần 1, e.g., patient.js) sang TypeScript: Thêm types cho variables/functions.
Định nghĩa models cơ bản:
Interface Patient { id: string; name: string; age: number; gender: 'male' | 'female' | 'other'; } (sử dụng Union cho gender).
Enum Role { Doctor = 'doctor', Patient = 'patient' }.
Áp dụng: Viết hàm getPatientInfo(patient: Patient): string, đảm bảo type-safe.
Clean Code: Refactor code để functions ngắn gọn (<15 lines), tên biến ý nghĩa.
📘Ngày 2: TypeScript Core - Generic và Module
Mục tiêu ngày: Sử dụng Generics để viết code reusable, tổ chức code với Modules.
Nội dung lý thuyết:
Generics: Tạo functions/classes linh hoạt (e.g., <T> để hỗ trợ nhiều types).
Modules: Export/import, namespaces, tổ chức code thành files riêng.
SOLID: Open-Closed Principle (OCP) - Code mở cho extension, đóng cho modification (sử dụng generics để tránh duplicate code).
Clean Code cho Frontend/Backend: DRY (Don't Repeat Yourself), sử dụng modules để tách logic.
Tài liệu gợi ý:
TypeScript docs: Generics, Modules.
Video: "TypeScript Generics Tutorial" trên freeCodeCamp.
Thực hành và Bài tập EMR:
Convert module JS quản lý array bệnh nhân sang TS với Generics: e.g., function addItem<T>(array: T[], item: T): T[].
Định nghĩa model Doctor: Interface Doctor { id: string; name: string; specialty: string; role: Role.Doctor; }.
Áp dụng modules: Tạo file models/patient.ts và models/doctor.ts, export interfaces, import vào main.ts.
Validate dữ liệu: Viết hàm checkAge(patient: Patient): boolean để kiểm tra age > 0 (sử dụng type guards cơ bản).
📘Ngày 3: TypeScript Core - Decorator và Utility Types
Mục tiêu ngày: Áp dụng Decorators cho metadata, Utility Types để transform types.
Nội dung lý thuyết:
Decorators: @decorator cho classes/methods (cần experimentalDecorators: true trong tsconfig).
Utility Types: Partial<T>, Readonly<T>, Pick<T, K>, Omit<T, K> để manipulate types.
SOLID: Liskov Substitution Principle (LSP) - Subtypes phải thay thế được base types mà không phá vỡ (sử dụng utility types để ensure).
Clean Code: YAGNI (You Aren't Gonna Need It) - Chỉ thêm decorators khi cần, giữ code đơn giản.
Tài liệu gợi ý:
TypeScript docs: Decorators, Utility Types.
Video: "TypeScript Decorators" trên Egghead.io.
Thực hành và Bài tập EMR:
Áp dụng Utility Types cho EMR: Tạo Partial<Patient> cho update patient (chỉ update một số fields).
Thêm decorator đơn giản: @Log cho method addPatient để log action (custom decorator).
Định nghĩa model MedicalRecord: Interface MedicalRecord { id: string; patientId: string; date: Date; diagnosis: string; }.
Convert JS code cũ sang TS, sử dụng Pick<MedicalRecord, 'id' | 'date'> cho views ngắn gọn.
📘Ngày 4: TypeScript Core - Type Guards, Enums Nâng Cao và Integration với JS
Mục tiêu ngày: Đảm bảo type safety với Type Guards, tích hợp TS với JS legacy.
Nội dung lý thuyết:
Type Guards: instanceof, typeof, custom guards (user-defined) để narrow types.
Enums nâng cao: Const enums, computed members.
Integration với JS: Declaration files (.d.ts), allowJs trong tsconfig.
SOLID: Interface Segregation Principle (ISP) - Nhiều interfaces nhỏ thay vì một lớn (áp dụng type guards để check).
Clean Code cho Backend: Functions nên có ít parameters, sử dụng guards để validate early.
Tài liệu gợi ý:
TypeScript docs: Type Guards, Advanced Enums.
Video: "Type Guards in TypeScript" trên Traversy Media.
Thực hành và Bài tập EMR:
Viết type guard: function isPatient(obj: any): obj is Patient { return typeof obj.name === 'string' && typeof obj.age === 'number'; }.
Integration: Giả sử có JS legacy module, tạo .d.ts để type nó, rồi import vào TS.
Áp dụng cho EMR: Validate input cho MedicalRecord với guards (e.g., check date is valid).
Enum nâng cao: Enum Status { Active = 'active', Inactive = 'inactive' }, dùng cho Patient status.
📘Ngày 5: SOLID Principles Chi Tiết
Mục tiêu ngày: Áp dụng toàn bộ SOLID để thiết kế code tốt hơn.
Nội dung lý thuyết:
SOLID full: SRP, OCP, LSP, ISP, Dependency Inversion Principle (DIP) - High-level modules không phụ thuộc low-level.
Áp dụng trong TS: Sử dụng interfaces để DIP, classes để OCP.
Clean Code cho Frontend: Component composition, avoid god components.
Integration: Kết hợp SOLID với TS types để enforce principles.
Tài liệu gợi ý:
Bài viết: "SOLID Principles in TypeScript" trên Medium.
Video: "SOLID Principles Explained" trên Web Dev Simplified.
Thực hành và Bài tập EMR:
Refactor models EMR theo SOLID: Tách PatientService class (SRP), sử dụng interfaces cho dependency (DIP).
Định nghĩa model Prescription: Interface Prescription { id: string; medicalRecordId: string; medicine: string; dosage: string; }.
Áp dụng ISP: Tạo nhỏ interfaces như IIdentifiable { id: string; } cho tất cả models.
📘Ngày 6: Clean Code cho Frontend & Backend
Mục tiêu ngày: Tập trung vào best practices Clean Code, áp dụng cho cả FE/BE.
Nội dung lý thuyết:
Clean Code principles: Meaningful names, small functions, comments chỉ khi cần, error handling.
Cho Frontend: React/NextJS - Hooks clean, avoid side effects.
Cho Backend: NestJS - Controllers/services tách biệt, async clean.
Kết hợp TS: Sử dụng types để tự document code.
Tài liệu gợi ý:
Sách Clean Code (chương 1-5).
Video: "Clean Code in TypeScript" trên YouTube.
Thực hành và Bài tập EMR:
Convert toàn bộ models EMR sang TS clean: Áp dụng typing cho dữ liệu (e.g., array<Patient>).
Validate input: Viết hàm validatePrescription(pres: any): pres is Prescription với guards và throw errors nếu invalid.
Refactor code cũ: Làm functions ngắn, thêm comments minimal.
📘Ngày 7: Tổng Hợp, Review và Áp Dụng EMR
Mục tiêu ngày: Kết hợp tất cả, review code để đảm bảo an toàn và dễ bảo trì.
Nội dung lý thuyết:
Review: Code smell detection (e.g., long methods), refactoring techniques.
Advanced integration: TS với JS libraries (e.g., lodash typings).
SOLID + Clean Code: Case studies trong full-stack.
Tài liệu gợi ý:
TypeScript docs: Best practices.
Video: "Refactoring to Clean Code" trên Refactoring Guru.
Thực hành và Bài tập EMR:
Hoàn thiện models: Kết nối Patient - Doctor - MedicalRecord - Prescription (e.g., Patient có array<MedicalRecord>).
Validate toàn bộ: Tạo validation module với guards cho input EMR data.
Review: Commit code lên Git, self-review (check SOLID, Clean), fix issues.
Bonus: Convert một JS module đầy đủ sang TS và test compile (tsc --noEmit).
