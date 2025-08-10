

const InputField = ({ id, label, type, placeholder, icon, children, value, onChange, error, name}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </div>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        className="block w-full border-0 border-b-2 border-gray-300 bg-transparent py-2 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-0 sm:text-sm"
        required
      />
      {/* สำหรับใส่ปุ่มเปิด/ปิดรหัสผ่าน */}
      {children}
    </div>
  </div>
);

export default InputField;