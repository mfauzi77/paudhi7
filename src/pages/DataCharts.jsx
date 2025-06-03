import React, { useState } from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import Papa from "papaparse";
import { saveAs } from "file-saver";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f", "#ffbb28", "#0088fe"];

const DataChart = () => {
  const [input, setInput] = useState({ name: "", value: "" });
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [chartType, setChartType] = useState("bar");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.name || !input.value || isNaN(input.value)) return;

    const updatedValue = parseInt(input.value);

    if (editingIndex !== null) {
      const updatedData = [...data];
      updatedData[editingIndex] = { name: input.name, value: updatedValue };
      setData(updatedData);
      setEditingIndex(null);
    } else {
      setData([...data, { name: input.name, value: updatedValue }]);
    }

    setInput({ name: "", value: "" });
  };

  const handleEdit = (index) => {
    setInput(data[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
    if (editingIndex === index) {
      setEditingIndex(null);
      setInput({ name: "", value: "" });
    }
  };

  const handleExport = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data-wilayah.csv");
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const parsed = results.data
          .filter(row => row.name && !isNaN(row.value))
          .map(row => ({ name: row.name, value: parseInt(row.value) }));
        setData(parsed);
      },
    });
  };

  const renderChart = () => {
    if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (chartType === "pie") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Input Data Wilayah</h2>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="name"
          placeholder="Nama Wilayah"
          value={input.name}
          onChange={handleChange}
          className="border px-4 py-2 rounded-md w-full md:w-1/3"
        />
        <input
          type="number"
          name="value"
          placeholder="Jumlah Data"
          value={input.value}
          onChange={handleChange}
          className="border px-4 py-2 rounded-md w-full md:w-1/3"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full md:w-auto"
        >
          {editingIndex !== null ? "Simpan Perubahan" : "Tambah"}
        </button>
      </form>

      {/* Tabel Data */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">Wilayah</th>
              <th className="border px-4 py-2 text-left">Jumlah</th>
              <th className="border px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">Belum ada data</td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.value}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-sm text-white bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-sm text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Tools: Pilihan Chart + Import/Export */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex gap-2">
          <button onClick={() => setChartType("bar")} className={`px-3 py-1 rounded ${chartType === "bar" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
            Bar
          </button>
          <button onClick={() => setChartType("line")} className={`px-3 py-1 rounded ${chartType === "line" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
            Line
          </button>
          <button onClick={() => setChartType("pie")} className={`px-3 py-1 rounded ${chartType === "pie" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
            Pie
          </button>
        </div>
        <div className="flex gap-3">
          <label className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded cursor-pointer">
            Import CSV
            <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
          </label>
          <button onClick={handleExport} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Export CSV
          </button>
        </div>
      </div>

      {/* Chart */}
      <h3 className="text-xl font-semibold mb-4">Visualisasi Chart</h3>
      {renderChart()}
    </div>
  );
};

export default DataChart;
