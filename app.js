// ============================================
// HR Management System - Main JavaScript
// ============================================

// Data Store (using localStorage for persistence)
const DB = {
    get(key) {
        const data = localStorage.getItem('hrm_' + key);
        return data ? JSON.parse(data) : [];
    },
    set(key, data) {
        localStorage.setItem('hrm_' + key, JSON.stringify(data));
    }
};

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// ============================================
// Initialize Sample Data
// ============================================
function initSampleData() {
    if (DB.get('departments').length === 0) {
        const departments = [
            { id: generateId(), name: 'إدارة عامة', manager: '', description: 'الإدارة العليا للشركة' },
            { id: generateId(), name: 'الموارد البشرية', manager: '', description: 'إدارة شؤون الموظفين' },
            { id: generateId(), name: 'تقنية المعلومات', manager: '', description: 'قسم التطوير والدعم الفني' },
            { id: generateId(), name: 'المالية والحسابات', manager: '', description: 'إدارة الشؤون المالية' },
            { id: generateId(), name: 'التسويق والمبيعات', manager: '', description: 'قسم التسويق وخدمة العملاء' },
            { id: generateId(), name: 'العمليات', manager: '', description: 'إدارة العمليات اليومية' }
        ];
        DB.set('departments', departments);

        const employees = [
            { id: generateId(), name: 'أحمد محمد العلي', email: 'ahmed@company.com', phone: '0551234567', address: 'الرياض', dob: '1985-03-15', gender: 'male', code: 'EMP001', department: departments[0].id, position: 'المدير العام', salary: 25000, hireDate: '2020-01-01', status: 'active' },
            { id: generateId(), name: 'فاطمة عبدالله الراشد', email: 'fatima@company.com', phone: '0557654321', address: 'جدة', dob: '1990-07-22', gender: 'female', code: 'EMP002', department: departments[1].id, position: 'مديرة الموارد البشرية', salary: 18000, hireDate: '2020-03-15', status: 'active' },
            { id: generateId(), name: 'خالد سعيد العمري', email: 'khaled@company.com', phone: '0559876543', address: 'الدمام', dob: '1988-11-10', gender: 'male', code: 'EMP003', department: departments[2].id, position: 'مبرمج', salary: 15000, hireDate: '2021-06-01', status: 'active' },
            { id: generateId(), name: 'نورة حسن الشمري', email: 'noura@company.com', phone: '0553456789', address: 'الرياض', dob: '1992-05-18', gender: 'female', code: 'EMP004', department: departments[3].id, position: 'محاسبة', salary: 12000, hireDate: '2021-09-01', status: 'active' },
            { id: generateId(), name: 'عبدالرحمن فهد القحطاني', email: 'abdulrahman@company.com', phone: '0552345678', address: 'مكة', dob: '1987-01-25', gender: 'male', code: 'EMP005', department: departments[4].id, position: 'مسؤول مبيعات', salary: 13000, hireDate: '2022-01-15', status: 'active' },
            { id: generateId(), name: 'سارة أحمد الدوسري', email: 'sara@company.com', phone: '0558765432', address: 'الرياض', dob: '1995-09-30', gender: 'female', code: 'EMP006', department: departments[2].id, position: 'محللة بيانات', salary: 14000, hireDate: '2022-05-01', status: 'active' },
            { id: generateId(), name: 'محمد إبراهيم الحربي', email: 'mohammed@company.com', phone: '0554567890', address: 'المدينة', dob: '1983-12-05', gender: 'male', code: 'EMP007', department: departments[5].id, position: 'مدير عمليات', salary: 20000, hireDate: '2020-06-01', status: 'active' },
            { id: generateId(), name: 'هدى ناصر المطيري', email: 'huda@company.com', phone: '0556789012', address: 'الخبر', dob: '1993-04-12', gender: 'female', code: 'EMP008', department: departments[1].id, position: 'محاضرة تدريب', salary: 11000, hireDate: '2023-01-01', status: 'inactive' }
        ];
        DB.set('employees', employees);

        const today = new Date().toISOString().split('T')[0];
        const attendance = [
            { id: generateId(), employeeId: employees[0].id, date: today, checkIn: '07:55', checkOut: '16:05', status: 'present', notes: '' },
            { id: generateId(), employeeId: employees[1].id, date: today, checkIn: '08:00', checkOut: '', status: 'present', notes: '' },
            { id: generateId(), employeeId: employees[2].id, date: today, checkIn: '08:30', checkOut: '', status: 'late', notes: 'وصول متأخر' },
            { id: generateId(), employeeId: employees[3].id, date: today, checkIn: '', checkOut: '', status: 'absent', notes: '' },
            { id: generateId(), employeeId: employees[4].id, date: today, checkIn: '07:50', checkOut: '15:30', status: 'present', notes: '' }
        ];
        DB.set('attendance', attendance);

        const leaves = [
            { id: generateId(), employeeId: employees[3].id, type: 'annual', from: '2026-09-01', to: '2026-09-05', reason: 'إجازة سنوية', status: 'pending' },
            { id: generateId(), employeeId: employees[5].id, type: 'sick', from: '2026-08-28', to: '2026-08-30', reason: 'عدم اللياقة', status: 'approved' },
            { id: generateId(), employeeId: employees[7].id, type: 'personal', from: '2026-09-10', to: '2026-09-12', reason: 'أمور شخصية', status: 'rejected' }
        ];
        DB.set('leaves', leaves);

        const salaries = [
            { id: generateId(), employeeId: employees[0].id, month: 8, year: 2026, basic: 25000, allowances: 3000, deductions: 1500, status: 'paid' },
            { id: generateId(), employeeId: employees[1].id, month: 8, year: 2026, basic: 18000, allowances: 2000, deductions: 1000, status: 'paid' },
            { id: generateId(), employeeId: employees[2].id, month: 8, year: 2026, basic: 15000, allowances: 1500, deductions: 800, status: 'pending' },
            { id: generateId(), employeeId: employees[3].id, month: 8, year: 2026, basic: 12000, allowances: 1000, deductions: 600, status: 'pending' }
        ];
        DB.set('salaries', salaries);

        const jobs = [
            { id: generateId(), title: 'مبرمج واجهات أمامية', department: departments[2].id, type: 'full-time', salary: 14000, experience: '2-3 سنوات', description: 'تطوير واجهات المستخدم للتطبيقات', status: 'open' },
            { id: generateId(), title: 'محاسب', department: departments[3].id, type: 'full-time', salary: 11000, experience: '1-2 سنة', description: 'إعداد التقارير المالية والمحاسبة', status: 'open' },
            { id: generateId(), title: 'مسؤول خدمة عملاء', department: departments[4].id, type: 'full-time', salary: 8000, experience: '-less than 1 year', description: 'الرد على استفسارات العملاء', status: 'closed' }
        ];
        DB.set('jobs', jobs);
    }
}

// ============================================
// Navigation
// ============================================
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.dataset.page;
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('page-' + page).classList.add('active');
        refreshPageData(page);
    });
});

// Mobile Menu Toggle
document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('open');
});

function refreshPageData(page) {
    switch(page) {
        case 'dashboard': renderDashboard(); break;
        case 'employees': renderEmployees(); break;
        case 'departments': renderDepartments(); break;
        case 'attendance': renderAttendance(); break;
        case 'leaves': renderLeaves(); break;
        case 'salaries': renderSalaries(); break;
        case 'recruitment': renderJobs(); break;
    }
}

// ============================================
// Toast Notifications
// ============================================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast ' + type + ' show';
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

// ============================================
// Modal Functions
// ============================================
function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

// Close modal on outside click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) this.classList.remove('active');
    });
});

// ============================================
// Helper Functions
// ============================================
function getEmployeeName(id) {
    const emp = DB.get('employees').find(e => e.id === id);
    return emp ? emp.name : 'غير معروف';
}

function getDepartmentName(id) {
    const dept = DB.get('departments').find(d => d.id === id);
    return dept ? dept.name : 'غير معروف';
}

function populateEmployeeSelect(selectId) {
    const select = document.getElementById(selectId);
    const employees = DB.get('employees').filter(e => e.status === 'active');
    select.innerHTML = '<option value="">اختر موظف</option>';
    employees.forEach(emp => {
        select.innerHTML += `<option value="${emp.id}">${emp.name}</option>`;
    });
}

function populateDepartmentSelect(selectId) {
    const select = document.getElementById(selectId);
    const departments = DB.get('departments');
    select.innerHTML = '<option value="">اختر قسم</option>';
    departments.forEach(dept => {
        select.innerHTML += `<option value="${dept.id}">${dept.name}</option>`;
    });
}

function populateManagerSelect(selectId) {
    const select = document.getElementById(selectId);
    const employees = DB.get('employees').filter(e => e.status === 'active');
    select.innerHTML = '<option value="">اختر مدير</option>';
    employees.forEach(emp => {
        select.innerHTML += `<option value="${emp.id}">${emp.name}</option>`;
    });
}

function calculateDays(from, to) {
    const start = new Date(from);
    const end = new Date(to);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return diff;
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('ar-SA', options);
}

const monthNames = ['', 'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

const leaveTypeNames = {
    'annual': 'إجازة سنوية',
    'sick': 'إجازة مرضية',
    'personal': 'إجازة شخصية',
    'emergency': 'إجازة طارئة',
    'maternity': 'إجازة أمومة'
};

const statusNames = {
    'active': 'نشط',
    'inactive': 'غير نشط',
    'present': 'حاضر',
    'absent': 'غائب',
    'late': 'متأخر',
    'leave': 'إجازة',
    'pending': 'معلق',
    'approved': 'موافق',
    'rejected': 'مرفوض',
    'paid': 'مدفوع',
    'open': 'متاح',
    'closed': 'مغلق'
};

const jobTypeNames = {
    'full-time': 'دوام كامل',
    'part-time': 'دوام جزئي',
    'contract': 'عقد',
    'intern': 'تدريب'
};

// ============================================
// DASHBOARD
// ============================================
function renderDashboard() {
    const employees = DB.get('employees');
    const departments = DB.get('departments');
    const attendance = DB.get('attendance');
    const leaves = DB.get('leaves');
    const salaries = DB.get('salaries');

    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = attendance.filter(a => a.date === today);

    document.getElementById('totalEmployees').textContent = employees.filter(e => e.status === 'active').length;
    document.getElementById('totalDepartments').textContent = departments.length;
    document.getElementById('presentToday').textContent = todayAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
    document.getElementById('absentToday').textContent = todayAttendance.filter(a => a.status === 'absent').length;

    const totalSal = salaries.reduce((sum, s) => sum + (s.basic + s.allowances - s.deductions), 0);
    document.getElementById('totalSalaries').textContent = totalSal.toLocaleString('ar-SA');
    document.getElementById('pendingLeaves').textContent = leaves.filter(l => l.status === 'pending').length;

    // Recent Employees
    const recentEmps = [...employees].reverse().slice(0, 5);
    const recentTable = document.querySelector('#recentEmployeesTable tbody');
    recentTable.innerHTML = recentEmps.map(emp => `
        <tr>
            <td>${emp.name}</td>
            <td>${getDepartmentName(emp.department)}</td>
            <td>${formatDate(emp.hireDate)}</td>
        </tr>
    `).join('');

    // Pending Leaves
    const pendingLeaves = leaves.filter(l => l.status === 'pending').slice(0, 5);
    const pendingTable = document.querySelector('#pendingLeavesTable tbody');
    pendingTable.innerHTML = pendingLeaves.map(leave => `
        <tr>
            <td>${getEmployeeName(leave.employeeId)}</td>
            <td>${leaveTypeNames[leave.type]}</td>
            <td>${formatDate(leave.from)}</td>
            <td>${formatDate(leave.to)}</td>
        </tr>
    `).join('');

    if (pendingLeaves.length === 0) {
        pendingTable.innerHTML = '<tr><td colspan="4" class="empty-state">لا توجد طلبات معلقة</td></tr>';
    }
}

// ============================================
// EMPLOYEES
// ============================================
let editingEmployeeId = null;

function renderEmployees() {
    populateDepartmentSelect('departmentFilter');
    const employees = DB.get('employees');
    renderEmployeesTable(employees);

    document.getElementById('employeeSearch').oninput = filterEmployees;
    document.getElementById('departmentFilter').onchange = filterEmployees;
    document.getElementById('statusFilter').onchange = filterEmployees;
}

function filterEmployees() {
    const search = document.getElementById('employeeSearch').value.toLowerCase();
    const dept = document.getElementById('departmentFilter').value;
    const status = document.getElementById('statusFilter').value;

    let employees = DB.get('employees');
    if (search) employees = employees.filter(e => e.name.toLowerCase().includes(search) || e.email.toLowerCase().includes(search) || e.code.toLowerCase().includes(search));
    if (dept) employees = employees.filter(e => e.department === dept);
    if (status) employees = employees.filter(e => e.status === status);

    renderEmployeesTable(employees);
}

function renderEmployeesTable(employees) {
    const tbody = document.querySelector('#employeesTable tbody');
    if (employees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="empty-state"><i class="fas fa-users"></i><br>لا يوجد موظفون</td></tr>';
        return;
    }
    tbody.innerHTML = employees.map(emp => `
        <tr>
            <td>${emp.code}</td>
            <td><strong>${emp.name}</strong></td>
            <td>${emp.email}</td>
            <td>${emp.phone || '-'}</td>
            <td>${getDepartmentName(emp.department)}</td>
            <td>${emp.position}</td>
            <td>${formatDate(emp.hireDate)}</td>
            <td><span class="status-badge status-${emp.status}">${statusNames[emp.status]}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn btn-icon btn-primary" onclick="editEmployee('${emp.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon btn-danger" onclick="confirmDelete('employee', '${emp.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openEmployeeModal(id = null) {
    editingEmployeeId = id;
    populateDepartmentSelect('empDepartment');
    document.getElementById('employeeModalTitle').textContent = id ? 'تعديل بيانات الموظف' : 'إضافة موظف جديد';
    document.getElementById('employeeForm').reset();

    if (id) {
        const emp = DB.get('employees').find(e => e.id === id);
        if (emp) {
            document.getElementById('empName').value = emp.name;
            document.getElementById('empEmail').value = emp.email;
            document.getElementById('empPhone').value = emp.phone || '';
            document.getElementById('empAddress').value = emp.address || '';
            document.getElementById('empDOB').value = emp.dob || '';
            document.getElementById('empGender').value = emp.gender || 'male';
            document.getElementById('empCode').value = emp.code;
            document.getElementById('empDepartment').value = emp.department;
            document.getElementById('empPosition').value = emp.position;
            document.getElementById('empSalary').value = emp.salary;
            document.getElementById('empHireDate').value = emp.hireDate;
            document.getElementById('empStatus').value = emp.status;
        }
    }
    openModal('employeeModal');
}

function editEmployee(id) {
    openEmployeeModal(id);
}

function saveEmployee(e) {
    e.preventDefault();
    const employees = DB.get('employees');
    const data = {
        name: document.getElementById('empName').value,
        email: document.getElementById('empEmail').value,
        phone: document.getElementById('empPhone').value,
        address: document.getElementById('empAddress').value,
        dob: document.getElementById('empDOB').value,
        gender: document.getElementById('empGender').value,
        code: document.getElementById('empCode').value,
        department: document.getElementById('empDepartment').value,
        position: document.getElementById('empPosition').value,
        salary: parseFloat(document.getElementById('empSalary').value),
        hireDate: document.getElementById('empHireDate').value,
        status: document.getElementById('empStatus').value
    };

    if (editingEmployeeId) {
        const idx = employees.findIndex(e => e.id === editingEmployeeId);
        if (idx !== -1) {
            employees[idx] = { ...employees[idx], ...data };
        }
        showToast('تم تعديل بيانات الموظف بنجاح');
    } else {
        data.id = generateId();
        employees.push(data);
        showToast('تم إضافة الموظف بنجاح');
    }

    DB.set('employees', employees);
    closeModal('employeeModal');
    renderEmployees();
    editingEmployeeId = null;
}

// ============================================
// DEPARTMENTS
// ============================================
let editingDepartmentId = null;

function renderDepartments() {
    const departments = DB.get('departments');
    const employees = DB.get('employees');
    const grid = document.getElementById('departmentsGrid');

    grid.innerHTML = departments.map(dept => {
        const empCount = employees.filter(e => e.department === dept.id && e.status === 'active').length;
        const manager = dept.manager ? getEmployeeName(dept.manager) : 'غير محدد';
        return `
            <div class="dept-card">
                <div class="dept-card-header">
                    <h3>${dept.name}</h3>
                    <div class="action-btns">
                        <button class="btn btn-icon btn-primary" onclick="editDepartment('${dept.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-icon btn-danger" onclick="confirmDelete('department', '${dept.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
                <p>${dept.description || 'لا يوجد وصف'}</p>
                <div class="dept-card-footer">
                    <span><i class="fas fa-user-tie"></i> ${manager}</span>
                    <span><i class="fas fa-users"></i> ${empCount} موظف</span>
                </div>
            </div>
        `;
    }).join('');

    if (departments.length === 0) {
        grid.innerHTML = '<div class="empty-state"><i class="fas fa-building"></i><p>لا توجد أقسام</p></div>';
    }
}

function openDepartmentModal(id = null) {
    editingDepartmentId = id;
    populateManagerSelect('deptManager');
    document.getElementById('departmentModalTitle').textContent = id ? 'تعديل القسم' : 'إضافة قسم جديد';
    document.getElementById('departmentForm').reset();

    if (id) {
        const dept = DB.get('departments').find(d => d.id === id);
        if (dept) {
            document.getElementById('deptName').value = dept.name;
            document.getElementById('deptManager').value = dept.manager || '';
            document.getElementById('deptDescription').value = dept.description || '';
        }
    }
    openModal('departmentModal');
}

function editDepartment(id) {
    openDepartmentModal(id);
}

function saveDepartment(e) {
    e.preventDefault();
    const departments = DB.get('departments');
    const data = {
        name: document.getElementById('deptName').value,
        manager: document.getElementById('deptManager').value,
        description: document.getElementById('deptDescription').value
    };

    if (editingDepartmentId) {
        const idx = departments.findIndex(d => d.id === editingDepartmentId);
        if (idx !== -1) departments[idx] = { ...departments[idx], ...data };
        showToast('تم تعديل القسم بنجاح');
    } else {
        data.id = generateId();
        departments.push(data);
        showToast('تم إضافة القسم بنجاح');
    }

    DB.set('departments', departments);
    closeModal('departmentModal');
    renderDepartments();
    editingDepartmentId = null;
}

// ============================================
// ATTENDANCE
// ============================================
let editingAttendanceId = null;

function renderAttendance() {
    populateEmployeeSelect('attEmployee');
    populateEmployeeSelect('attendanceEmpFilter');
    document.getElementById('attDate').value = new Date().toISOString().split('T')[0];

    const attendance = DB.get('attendance');
    renderAttendanceTable(attendance);

    document.getElementById('attendanceDate').onchange = filterAttendance;
    document.getElementById('attendanceEmpFilter').onchange = filterAttendance;
    document.getElementById('attendanceStatusFilter').onchange = filterAttendance;
}

function filterAttendance() {
    const date = document.getElementById('attendanceDate').value;
    const emp = document.getElementById('attendanceEmpFilter').value;
    const status = document.getElementById('attendanceStatusFilter').value;

    let attendance = DB.get('attendance');
    if (date) attendance = attendance.filter(a => a.date === date);
    if (emp) attendance = attendance.filter(a => a.employeeId === emp);
    if (status) attendance = attendance.filter(a => a.status === status);

    renderAttendanceTable(attendance);
}

function renderAttendanceTable(records) {
    const tbody = document.querySelector('#attendanceTable tbody');
    if (records.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-state"><i class="fas fa-fingerprint"></i><p>لا توجد سجلات</p></td></tr>';
        return;
    }
    tbody.innerHTML = records.map(rec => `
        <tr>
            <td>${getEmployeeName(rec.employeeId)}</td>
            <td>${formatDate(rec.date)}</td>
            <td>${rec.checkIn || '-'}</td>
            <td>${rec.checkOut || '-'}</td>
            <td><span class="status-badge status-${rec.status}">${statusNames[rec.status]}</span></td>
            <td>${rec.notes || '-'}</td>
            <td>
                <div class="action-btns">
                    <button class="btn btn-icon btn-primary" onclick="editAttendance('${rec.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon btn-danger" onclick="confirmDelete('attendance', '${rec.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openAttendanceModal(id = null) {
    editingAttendanceId = id;
    populateEmployeeSelect('attEmployee');
    document.getElementById('attendanceForm').reset();
    document.getElementById('attDate').value = new Date().toISOString().split('T')[0];

    if (id) {
        const rec = DB.get('attendance').find(a => a.id === id);
        if (rec) {
            document.getElementById('attEmployee').value = rec.employeeId;
            document.getElementById('attDate').value = rec.date;
            document.getElementById('attCheckIn').value = rec.checkIn || '';
            document.getElementById('attCheckOut').value = rec.checkOut || '';
            document.getElementById('attStatus').value = rec.status;
            document.getElementById('attNotes').value = rec.notes || '';
        }
    }
    openModal('attendanceModal');
}

function editAttendance(id) {
    openAttendanceModal(id);
}

function saveAttendance(e) {
    e.preventDefault();
    const attendance = DB.get('attendance');
    const data = {
        employeeId: document.getElementById('attEmployee').value,
        date: document.getElementById('attDate').value,
        checkIn: document.getElementById('attCheckIn').value,
        checkOut: document.getElementById('attCheckOut').value,
        status: document.getElementById('attStatus').value,
        notes: document.getElementById('attNotes').value
    };

    if (editingAttendanceId) {
        const idx = attendance.findIndex(a => a.id === editingAttendanceId);
        if (idx !== -1) attendance[idx] = { ...attendance[idx], ...data };
        showToast('تم تعديل السجل بنجاح');
    } else {
        data.id = generateId();
        attendance.push(data);
        showToast('تم تسجيل الحضور بنجاح');
    }

    DB.set('attendance', attendance);
    closeModal('attendanceModal');
    renderAttendance();
    editingAttendanceId = null;
}

// ============================================
// LEAVES
// ============================================
let editingLeaveId = null;

function renderLeaves() {
    populateEmployeeSelect('leaveEmployee');
    populateEmployeeSelect('leaveEmpFilter');
    const leaves = DB.get('leaves');
    renderLeavesTable(leaves);

    document.getElementById('leaveEmpFilter').onchange = filterLeaves;
    document.getElementById('leaveTypeFilter').onchange = filterLeaves;
    document.getElementById('leaveStatusFilter').onchange = filterLeaves;
}

function filterLeaves() {
    const emp = document.getElementById('leaveEmpFilter').value;
    const type = document.getElementById('leaveTypeFilter').value;
    const status = document.getElementById('leaveStatusFilter').value;

    let leaves = DB.get('leaves');
    if (emp) leaves = leaves.filter(l => l.employeeId === emp);
    if (type) leaves = leaves.filter(l => l.type === type);
    if (status) leaves = leaves.filter(l => l.status === status);

    renderLeavesTable(leaves);
}

function renderLeavesTable(leaves) {
    const tbody = document.querySelector('#leavesTable tbody');
    if (leaves.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="empty-state"><i class="fas fa-calendar-alt"></i><p>لا توجد طلبات إجازة</p></td></tr>';
        return;
    }
    tbody.innerHTML = leaves.map(leave => `
        <tr>
            <td>${getEmployeeName(leave.employeeId)}</td>
            <td>${leaveTypeNames[leave.type]}</td>
            <td>${formatDate(leave.from)}</td>
            <td>${formatDate(leave.to)}</td>
            <td>${calculateDays(leave.from, leave.to)}</td>
            <td>${leave.reason || '-'}</td>
            <td><span class="status-badge status-${leave.status}">${statusNames[leave.status]}</span></td>
            <td>
                <div class="action-btns">
                    ${leave.status === 'pending' ? `
                        <button class="btn btn-icon btn-success" onclick="updateLeaveStatus('${leave.id}', 'approved')" title="موافقة"><i class="fas fa-check"></i></button>
                        <button class="btn btn-icon btn-danger" onclick="updateLeaveStatus('${leave.id}', 'rejected')" title="رفض"><i class="fas fa-times"></i></button>
                    ` : ''}
                    <button class="btn btn-icon btn-primary" onclick="editLeave('${leave.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon btn-danger" onclick="confirmDelete('leave', '${leave.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openLeaveModal(id = null) {
    editingLeaveId = id;
    populateEmployeeSelect('leaveEmployee');
    document.getElementById('leaveForm').reset();

    if (id) {
        const leave = DB.get('leaves').find(l => l.id === id);
        if (leave) {
            document.getElementById('leaveEmployee').value = leave.employeeId;
            document.getElementById('leaveType').value = leave.type;
            document.getElementById('leaveFrom').value = leave.from;
            document.getElementById('leaveTo').value = leave.to;
            document.getElementById('leaveReason').value = leave.reason || '';
        }
    }
    openModal('leaveModal');
}

function editLeave(id) {
    openLeaveModal(id);
}

function saveLeave(e) {
    e.preventDefault();
    const leaves = DB.get('leaves');
    const data = {
        employeeId: document.getElementById('leaveEmployee').value,
        type: document.getElementById('leaveType').value,
        from: document.getElementById('leaveFrom').value,
        to: document.getElementById('leaveTo').value,
        reason: document.getElementById('leaveReason').value,
        status: editingLeaveId ? undefined : 'pending'
    };

    if (editingLeaveId) {
        const idx = leaves.findIndex(l => l.id === editingLeaveId);
        if (idx !== -1) {
            data.status = leaves[idx].status;
            leaves[idx] = { ...leaves[idx], ...data };
        }
        showToast('تم تعديل طلب الإجازة');
    } else {
        data.id = generateId();
        leaves.push(data);
        showToast('تم إرسال طلب الإجازة');
    }

    DB.set('leaves', leaves);
    closeModal('leaveModal');
    renderLeaves();
    editingLeaveId = null;
}

function updateLeaveStatus(id, status) {
    const leaves = DB.get('leaves');
    const idx = leaves.findIndex(l => l.id === id);
    if (idx !== -1) {
        leaves[idx].status = status;
        DB.set('leaves', leaves);
        renderLeaves();
        showToast(status === 'approved' ? 'تمت الموافقة على الإجازة' : 'تم رفض الإجازة', status === 'approved' ? 'success' : 'warning');
    }
}

// ============================================
// SALARIES
// ============================================
let editingSalaryId = null;

function renderSalaries() {
    populateEmployeeSelect('salEmployee');
    const salaries = DB.get('salaries');
    renderSalariesTable(salaries);

    const years = [...new Set(salaries.map(s => s.year))].sort();
    const yearSelect = document.getElementById('salaryYearFilter');
    yearSelect.innerHTML = '<option value="">جميع السنوات</option>';
    years.forEach(y => yearSelect.innerHTML += `<option value="${y}">${y}</option>`);

    document.getElementById('salaryMonthFilter').onchange = filterSalaries;
    document.getElementById('salaryYearFilter').onchange = filterSalaries;
}

function filterSalaries() {
    const month = document.getElementById('salaryMonthFilter').value;
    const year = document.getElementById('salaryYearFilter').value;

    let salaries = DB.get('salaries');
    if (month) salaries = salaries.filter(s => s.month === parseInt(month));
    if (year) salaries = salaries.filter(s => s.year === parseInt(year));

    renderSalariesTable(salaries);
}

function renderSalariesTable(salaries) {
    const tbody = document.querySelector('#salariesTable tbody');
    if (salaries.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="empty-state"><i class="fas fa-money-bill-wave"></i><p>لا توجد سجلات رواتب</p></td></tr>';
        return;
    }
    tbody.innerHTML = salaries.map(sal => {
        const net = sal.basic + sal.allowances - sal.deductions;
        return `
            <tr>
                <td>${getEmployeeName(sal.employeeId)}</td>
                <td>${monthNames[sal.month]}</td>
                <td>${sal.year}</td>
                <td>${sal.basic.toLocaleString('ar-SA')} ر.س</td>
                <td>${sal.allowances.toLocaleString('ar-SA')} ر.س</td>
                <td>${sal.deductions.toLocaleString('ar-SA')} ر.س</td>
                <td><strong>${net.toLocaleString('ar-SA')} ر.س</strong></td>
                <td><span class="status-badge status-${sal.status}">${statusNames[sal.status]}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-icon btn-primary" onclick="editSalary('${sal.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-icon btn-danger" onclick="confirmDelete('salary', '${sal.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function openSalaryModal(id = null) {
    editingSalaryId = id;
    populateEmployeeSelect('salEmployee');
    document.getElementById('salaryForm').reset();
    document.getElementById('salYear').value = new Date().getFullYear();
    document.getElementById('salMonth').value = new Date().getMonth() + 1;

    if (id) {
        const sal = DB.get('salaries').find(s => s.id === id);
        if (sal) {
            document.getElementById('salEmployee').value = sal.employeeId;
            document.getElementById('salMonth').value = sal.month;
            document.getElementById('salYear').value = sal.year;
            document.getElementById('salBasic').value = sal.basic;
            document.getElementById('salAllowances').value = sal.allowances;
            document.getElementById('salDeductions').value = sal.deductions;
            document.getElementById('salStatus').value = sal.status;
        }
    }
    openModal('salaryModal');
}

function editSalary(id) {
    openSalaryModal(id);
}

function saveSalary(e) {
    e.preventDefault();
    const salaries = DB.get('salaries');
    const data = {
        employeeId: document.getElementById('salEmployee').value,
        month: parseInt(document.getElementById('salMonth').value),
        year: parseInt(document.getElementById('salYear').value),
        basic: parseFloat(document.getElementById('salBasic').value),
        allowances: parseFloat(document.getElementById('salAllowances').value) || 0,
        deductions: parseFloat(document.getElementById('salDeductions').value) || 0,
        status: document.getElementById('salStatus').value
    };

    if (editingSalaryId) {
        const idx = salaries.findIndex(s => s.id === editingSalaryId);
        if (idx !== -1) salaries[idx] = { ...salaries[idx], ...data };
        showToast('تم تعديل الراتب بنجاح');
    } else {
        data.id = generateId();
        salaries.push(data);
        showToast('تم إضافة الراتب بنجاح');
    }

    DB.set('salaries', salaries);
    closeModal('salaryModal');
    renderSalaries();
    editingSalaryId = null;
}

// ============================================
// RECRUITMENT (Jobs)
// ============================================
let editingJobId = null;

function renderJobs() {
    populateDepartmentSelect('jobDepartment');
    const jobs = DB.get('jobs');
    renderJobsTable(jobs);
}

function renderJobsTable(jobs) {
    const tbody = document.querySelector('#jobsTable tbody');
    if (jobs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-state"><i class="fas fa-briefcase"></i><p>لا توجد وظائف</p></td></tr>';
        return;
    }
    tbody.innerHTML = jobs.map(job => `
        <tr>
            <td><strong>${job.title}</strong></td>
            <td>${getDepartmentName(job.department)}</td>
            <td>${jobTypeNames[job.type]}</td>
            <td>${job.salary ? job.salary.toLocaleString('ar-SA') + ' ر.س' : '-'}</td>
            <td>${job.experience || '-'}</td>
            <td><span class="status-badge status-${job.status}">${statusNames[job.status]}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn btn-icon btn-primary" onclick="editJob('${job.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon btn-danger" onclick="confirmDelete('job', '${job.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openJobModal(id = null) {
    editingJobId = id;
    populateDepartmentSelect('jobDepartment');
    document.getElementById('jobForm').reset();

    if (id) {
        const job = DB.get('jobs').find(j => j.id === id);
        if (job) {
            document.getElementById('jobTitle').value = job.title;
            document.getElementById('jobDepartment').value = job.department;
            document.getElementById('jobType').value = job.type;
            document.getElementById('jobSalary').value = job.salary || '';
            document.getElementById('jobExperience').value = job.experience || '';
            document.getElementById('jobDescription').value = job.description || '';
        }
    }
    openModal('jobModal');
}

function editJob(id) {
    openJobModal(id);
}

function saveJob(e) {
    e.preventDefault();
    const jobs = DB.get('jobs');
    const data = {
        title: document.getElementById('jobTitle').value,
        department: document.getElementById('jobDepartment').value,
        type: document.getElementById('jobType').value,
        salary: parseFloat(document.getElementById('jobSalary').value) || 0,
        experience: document.getElementById('jobExperience').value,
        description: document.getElementById('jobDescription').value,
        status: 'open'
    };

    if (editingJobId) {
        const idx = jobs.findIndex(j => j.id === editingJobId);
        if (idx !== -1) {
            data.status = jobs[idx].status;
            jobs[idx] = { ...jobs[idx], ...data };
        }
        showToast('تم تعديل الوظيفة بنجاح');
    } else {
        data.id = generateId();
        jobs.push(data);
        showToast('تم إضافة الوظيفة بنجاح');
    }

    DB.set('jobs', jobs);
    closeModal('jobModal');
    renderJobs();
    editingJobId = null;
}

// ============================================
// DELETE
// ============================================
let deleteTarget = { type: '', id: '' };

function confirmDelete(type, id) {
    deleteTarget = { type, id };
    openModal('deleteModal');
}

document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
    const { type, id } = deleteTarget;
    let data = DB.get(type + 's') || DB.get(type);
    let key = type + 's';

    if (type === 'leave') key = 'leaves';
    if (type === 'salary') key = 'salaries';
    if (type === 'job') key = 'jobs';

    data = DB.get(key).filter(item => item.id !== id);
    DB.set(key, data);

    closeModal('deleteModal');
    showToast('تم الحذف بنجاح');

    // Refresh current page
    const activePage = document.querySelector('.nav-item.active')?.dataset.page || 'dashboard';
    refreshPageData(activePage);
});

// ============================================
// REPORTS
// ============================================
function generateReport(type) {
    const output = document.getElementById('reportOutput');
    const title = document.getElementById('reportTitle');
    const content = document.getElementById('reportContent');
    output.style.display = 'block';

    const employees = DB.get('employees');
    const departments = DB.get('departments');
    const attendance = DB.get('attendance');
    const leaves = DB.get('leaves');
    const salaries = DB.get('salaries');

    switch(type) {
        case 'employees':
            title.textContent = 'تقرير الموظفين';
            content.innerHTML = `
                <table class="data-table">
                    <thead><tr><th>الرقم</th><th>الاسم</th><th>القسم</th><th>المنصب</th><th>تاريخ التعيين</th><th>الحالة</th></tr></thead>
                    <tbody>${employees.map(e => `<tr><td>${e.code}</td><td>${e.name}</td><td>${getDepartmentName(e.department)}</td><td>${e.position}</td><td>${formatDate(e.hireDate)}</td><td>${statusNames[e.status]}</td></tr>`).join('')}</tbody>
                </table>
            `;
            break;
        case 'attendance':
            title.textContent = 'تقرير الحضور';
            const today = new Date().toISOString().split('T')[0];
            const todayRecs = attendance.filter(a => a.date === today);
            content.innerHTML = `
                <p><strong>تاريخ اليوم:</strong> ${formatDate(today)}</p>
                <table class="data-table">
                    <thead><tr><th>الموظف</th><th>وقت الدخول</th><th>وقت الخروج</th><th>الحالة</th></tr></thead>
                    <tbody>${todayRecs.map(r => `<tr><td>${getEmployeeName(r.employeeId)}</td><td>${r.checkIn || '-'}</td><td>${r.checkOut || '-'}</td><td>${statusNames[r.status]}</td></tr>`).join('')}</tbody>
                </table>
            `;
            break;
        case 'leaves':
            title.textContent = 'تقرير الإجازات';
            content.innerHTML = `
                <table class="data-table">
                    <thead><tr><th>الموظف</th><th>النوع</th><th>من</th><th>إلى</th><th>الأيام</th><th>الحالة</th></tr></thead>
                    <tbody>${leaves.map(l => `<tr><td>${getEmployeeName(l.employeeId)}</td><td>${leaveTypeNames[l.type]}</td><td>${formatDate(l.from)}</td><td>${formatDate(l.to)}</td><td>${calculateDays(l.from, l.to)}</td><td>${statusNames[l.status]}</td></tr>`).join('')}</tbody>
                </table>
            `;
            break;
        case 'salaries':
            title.textContent = 'تقرير الرواتب';
            content.innerHTML = `
                <table class="data-table">
                    <thead><tr><th>الموظف</th><th>الشهر</th><th>السنة</th><th>الأساسي</th><th>البدلات</th><th>الخصومات</th><th>الصافي</th></tr></thead>
                    <tbody>${salaries.map(s => `<tr><td>${getEmployeeName(s.employeeId)}</td><td>${monthNames[s.month]}</td><td>${s.year}</td><td>${s.basic.toLocaleString()}</td><td>${s.allowances.toLocaleString()}</td><td>${s.deductions.toLocaleString()}</td><td><strong>${(s.basic + s.allowances - s.deductions).toLocaleString()}</strong></td></tr>`).join('')}</tbody>
                </table>
            `;
            break;
        case 'departments':
            title.textContent = 'تقرير الأقسام';
            content.innerHTML = `
                <table class="data-table">
                    <thead><tr><th>القسم</th><th>المدير</th><th>عدد الموظفين</th><th>الوصف</th></tr></thead>
                    <tbody>${departments.map(d => {
                        const count = employees.filter(e => e.department === d.id && e.status === 'active').length;
                        return `<tr><td>${d.name}</td><td>${d.manager ? getEmployeeName(d.manager) : '-'}</td><td>${count}</td><td>${d.description || '-'}</td></tr>`;
                    }).join('')}</tbody>
                </table>
            `;
            break;
        case 'turnover':
            title.textContent = 'تقرير الدوران الوظيفي';
            const active = employees.filter(e => e.status === 'active').length;
            const inactive = employees.filter(e => e.status === 'inactive').length;
            const total = employees.length;
            const rate = total > 0 ? ((inactive / total) * 100).toFixed(1) : 0;
            content.innerHTML = `
                <div class="stats-grid">
                    <div class="stat-card"><div class="stat-icon green"><i class="fas fa-user-check"></i></div><div class="stat-info"><h3>${active}</h3><p>الموظفون النشطون</p></div></div>
                    <div class="stat-card"><div class="stat-icon red"><i class="fas fa-user-times"></i></div><div class="stat-info"><h3>${inactive}</h3><p>الموظفون غير النشطين</p></div></div>
                    <div class="stat-card"><div class="stat-icon blue"><i class="fas fa-percentage"></i></div><div class="stat-info"><h3>${rate}%</h3><p>معدل الدوران</p></div></div>
                </div>
            `;
            break;
    }

    output.scrollIntoView({ behavior: 'smooth' });
}

function printReport() {
    const content = document.getElementById('reportContent').innerHTML;
    const title = document.getElementById('reportTitle').textContent;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html><head><title>${title}</title>
        <style>body{font-family:sans-serif;direction:rtl;padding:20px;}table{width:100%;border-collapse:collapse;}th,td{border:1px solid #ccc;padding:8px;text-align:right;}th{background:#f0f0f0;}</style>
        </head><body><h1>${title}</h1>${content}</body></html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// ============================================
// Global Search
// ============================================
document.getElementById('globalSearch').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    if (!query) return;

    const employees = DB.get('employees').filter(e =>
        e.name.toLowerCase().includes(query) ||
        e.email.toLowerCase().includes(query) ||
        e.code.toLowerCase().includes(query)
    );

    if (employees.length > 0) {
        // Navigate to employees page
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.querySelector('[data-page="employees"]').classList.add('active');
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('page-employees').classList.add('active');
        document.getElementById('employeeSearch').value = query;
        filterEmployees();
    }
});

// ============================================
// Initialize
// ============================================
initSampleData();
renderDashboard();
