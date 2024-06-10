import { Toaster } from "./components/ui/toaster.tsx";
import Select from "./components/DropDown/index.tsx";
function App() {
  return (
    <div>
      <Toaster />
      <div className="border-2 border-red-400 w-full h-screen flex justify-center items-center">
        <Select className="bg-blue-500 w-1/4 h-16">
          <Select.Option key="1">Hello</Select.Option>
          <Select.Option key="2">World</Select.Option>
          <Select.Option key="3">Blue</Select.Option>
        </Select>
      </div>
    </div>
  );
}
export default App;
