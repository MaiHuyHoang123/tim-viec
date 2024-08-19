export function createSlug(text) {
	return text
		.toLowerCase() // Chuyển thành chữ thường
		.replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
		.replace(/-+/g, '-') // Xóa các dấu gạch ngang dư thừa
		.replace(/^-+|-+$/g, ''); // Loại bỏ dấu gạch ngang ở đầu và cuối
}
