// import React, { useState, useEffect } from 'react';
// import { PlusCircle, Search, Trash2, Pencil, Users, User, X, UserPlus } from 'lucide-react';
// import { v4 as uuidv4 } from 'uuid';

// const initialBatches = [
//   {
//     id: uuidv4(),
//     name: 'Q3 Sales Training',
//     description: 'Quarterly training for the sales team.',
//     trainees: [
//       { id: 'EMP1001', name: 'Alice Johnson' },
//       { id: 'EMP1002', name: 'Bob Smith' },
//       { id: 'EMP1003', name: 'Charlie Davis' },
//     ],
//   },
//   {
//     id: uuidv4(),
//     name: 'React Fundamentals',
//     description: 'Introduction to React for new developers.',
//     trainees: [
//       { id: 'EMP2001', name: 'Diana Miller' },
//       { id: 'EMP2002', name: 'Frank White' },
//     ],
//   },
// ];

// const BatchManagement= () => {
//   const [batches, setBatches] = useState(initialBatches);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingBatch, setEditingBatch] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Modal State
//   const [batchName, setBatchName] = useState('');
//   const [description, setDescription] = useState('');
//   const [traineeInput, setTraineeInput] = useState('');
//   const [trainees, setTrainees] = useState([]);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (editingBatch) {
//       setBatchName(editingBatch.name);
//       setDescription(editingBatch.description);
//       setTrainees(editingBatch.trainees);
//     } else {
//       setBatchName('');
//       setDescription('');
//       setTrainees([]);
//     }
//   }, [editingBatch]);

//   const handleOpenModal = (batch = null) => {
//     setEditingBatch(batch);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditingBatch(null);
//     setErrors({});
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!batchName.trim()) {
//       newErrors.batchName = 'Batch name is required.';
//     }
//     return newErrors;
//   };

//   const handleAddTrainees = () => {
//     const newTraineeIds = traineeInput
//       .split(',')
//       .map(id => id.trim())
//       .filter(id => id.length > 0);

//     const newTrainees = newTraineeIds.map(id => ({
//       id,
//       name: `Trainee ${id}`, // Mocking trainee names
//     }));

//     const existingIds = new Set(trainees.map(t => t.id));
//     const uniqueNewTrainees = newTrainees.filter(t => !existingIds.has(t.id));

//     setTrainees([...trainees, ...uniqueNewTrainees]);
//     setTraineeInput('');
//   };

//   const handleRemoveTrainee = (id) => {
//     setTrainees(trainees.filter(t => t.id !== id));
//   };

//   const handleSaveBatch = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const batchData = {
//       name: batchName,
//       description,
//       trainees,
//     };

//     if (editingBatch) {
//       // Edit existing batch
//       setBatches(batches.map(b => b.id === editingBatch.id ? { ...batchData, id: editingBatch.id } : b));
//     } else {
//       // Create new batch
//       setBatches([...batches, { ...batchData, id: uuidv4() }]);
//     }
//     handleCloseModal();
//   };

//   const handleDeleteBatch = (id) => {
//     if (window.confirm("Are you sure you want to delete this batch?")) {
//       setBatches(batches.filter(b => b.id !== id));
//     }
//   };

//   const filteredBatches = batches.filter(batch =>
//     batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     batch.trainees.some(trainee =>
//       trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       trainee.id.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   return (
//     <div className="bg-gray-100 min-h-screen p-8 font-sans">
//       <header className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Batch Management</h1>
//         <button
//           onClick={() => handleOpenModal()}
//           className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors flex items-center"
//         >
//           <PlusCircle className="w-5 h-5 mr-2" />
//           Create New Batch
//         </button>
//       </header>

//       <div className="flex items-center space-x-4 mb-6">
//         <div className="relative w-full max-w-lg">
//           <input
//             type="text"
//             placeholder="Search batches or trainees..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredBatches.length > 0 ? (
//           filteredBatches.map((batch) => (
//             <div key={batch.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
//               <div>
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold text-gray-800">{batch.name}</h2>
//                   <div className="flex items-center space-x-2 text-gray-500">
//                     <button
//                       onClick={() => handleOpenModal(batch)}
//                       className="text-gray-500 hover:text-indigo-600 transition-colors"
//                       title="Edit Batch"
//                     >
//                       <Pencil className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteBatch(batch.id)}
//                       className="text-gray-500 hover:text-red-600 transition-colors"
//                       title="Delete Batch"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 mb-4">{batch.description}</p>
                
//                 <h3 className="text-sm font-medium text-gray-500 flex items-center mb-2">
//                   <Users className="w-4 h-4 mr-2" />
//                   Trainees ({batch.trainees.length})
//                 </h3>
//                 <ul className="space-y-2 text-sm text-gray-700 max-h-32 overflow-y-auto">
//                   {batch.trainees.map((trainee, index) => (
//                     <li key={index} className="flex items-center space-x-2 p-2 rounded-md bg-gray-50">
//                       <User className="w-4 h-4 text-gray-400" />
//                       <span>{trainee.name} ({trainee.id})</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-12 text-gray-500">
//             <p>No batches found. Try creating a new one!</p>
//           </div>
//         )}
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <X className="w-6 h-6" />
//             </button>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">
//               {editingBatch ? 'Edit Batch' : 'Create New Batch'}
//             </h2>
//             <form onSubmit={handleSaveBatch} className="space-y-4">
//               <div>
//                 <label htmlFor="batchName" className="block text-sm font-medium text-gray-700">
//                   Batch Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="batchName"
//                   value={batchName}
//                   onChange={(e) => setBatchName(e.target.value)}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="e.g., Q3 Sales Training"
//                 />
//                 {errors.batchName && <p className="mt-1 text-xs text-red-500">{errors.batchName}</p>}
//               </div>
//               <div>
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <textarea
//                   id="description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   rows="3"
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="A brief description of the batch content."
//                 />
//               </div>
//               <div className="space-y-2">
//                 <h3 className="text-sm font-medium text-gray-700">Trainees</h3>
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="text"
//                     value={traineeInput}
//                     onChange={(e) => setTraineeInput(e.target.value)}
//                     className="flex-grow border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Enter Employee ID(s) separated by commas"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleAddTrainees}
//                     className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center"
//                   >
//                     <UserPlus className="w-4 h-4 mr-2" />
//                     Add
//                   </button>
//                 </div>
//                 {trainees.length > 0 && (
//                   <ul className="mt-4 border border-gray-200 rounded-md max-h-48 overflow-y-auto">
//                     {trainees.map((trainee) => (
//                       <li
//                         key={trainee.id}
//                         className="flex items-center justify-between p-3 border-b last:border-b-0"
//                       >
//                         <span className="text-gray-800">{trainee.name} ({trainee.id})</span>
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveTrainee(trainee.id)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//               <div className="flex justify-end pt-4 space-x-2">
//                 <button
//                   type="button"
//                   onClick={handleCloseModal}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-colors"
//                 >
//                   Save Batch
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BatchManagement;


import React, { useState, useEffect } from 'react';
import { PlusCircle, Search, Trash2, Pencil, Users, User, X, UserPlus, Calendar } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const initialBatches = [
  {
    id: uuidv4(),
    name: 'Q3 Sales Training',
    description: 'Quarterly training for the sales team.',
    startDate: '2025-09-10',
    endDate: '2025-09-20',
    trainees: [
      { id: 'EMP1001', name: 'Alice Johnson' },
      { id: 'EMP1002', name: 'Bob Smith' },
      { id: 'EMP1003', name: 'Charlie Davis' },
    ],
  },
  {
    id: uuidv4(),
    name: 'React Fundamentals',
    description: 'Introduction to React for new developers.',
    startDate: '2025-09-15',
    endDate: '2025-09-25',
    trainees: [
      { id: 'EMP2001', name: 'Diana Miller' },
      { id: 'EMP2002', name: 'Frank White' },
    ],
  },
];

const BatchManagement = () => {
  const [batches, setBatches] = useState(initialBatches);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [batchName, setBatchName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [traineeInput, setTraineeInput] = useState('');
  const [trainees, setTrainees] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBatch) {
      setBatchName(editingBatch.name);
      setDescription(editingBatch.description);
      setStartDate(editingBatch.startDate || '');
      setEndDate(editingBatch.endDate || '');
      setTrainees(editingBatch.trainees);
    } else {
      setBatchName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setTrainees([]);
    }
  }, [editingBatch]);

  const handleOpenModal = (batch = null) => {
    setEditingBatch(batch);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBatch(null);
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!batchName.trim()) {
      newErrors.batchName = 'Batch name is required.';
    }
    if (!startDate) {
      newErrors.startDate = 'Start date is required.';
    }
    if (!endDate) {
      newErrors.endDate = 'End date is required.';
    }
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      newErrors.endDate = 'End date cannot be earlier than start date.';
    }
    return newErrors;
  };

  const handleAddTrainees = () => {
    const newTraineeIds = traineeInput
      .split(',')
      .map(id => id.trim())
      .filter(id => id.length > 0);

    const newTrainees = newTraineeIds.map(id => ({
      id,
      name: `Trainee ${id}`, // Mocking trainee names
    }));

    const existingIds = new Set(trainees.map(t => t.id));
    const uniqueNewTrainees = newTrainees.filter(t => !existingIds.has(t.id));

    setTrainees([...trainees, ...uniqueNewTrainees]);
    setTraineeInput('');
  };

  const handleRemoveTrainee = (id) => {
    setTrainees(trainees.filter(t => t.id !== id));
  };

  const handleSaveBatch = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const batchData = {
      name: batchName,
      description,
      startDate,
      endDate,
      trainees,
    };

    if (editingBatch) {
      setBatches(batches.map(b => b.id === editingBatch.id ? { ...batchData, id: editingBatch.id } : b));
    } else {
      setBatches([...batches, { ...batchData, id: uuidv4() }]);
    }
    handleCloseModal();
  };

  const handleDeleteBatch = (id) => {
    if (window.confirm("Are you sure you want to delete this batch?")) {
      setBatches(batches.filter(b => b.id !== id));
    }
  };

  const filteredBatches = batches.filter(batch =>
    batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.trainees.some(trainee =>
      trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainee.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Batch Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Create New Batch
        </button>
      </header>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search batches or trainees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBatches.length > 0 ? (
          filteredBatches.map((batch) => (
            <div key={batch.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{batch.name}</h2>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <button
                      onClick={() => handleOpenModal(batch)}
                      className="text-gray-500 hover:text-indigo-600 transition-colors"
                      title="Edit Batch"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteBatch(batch.id)}
                      className="text-gray-500 hover:text-red-600 transition-colors"
                      title="Delete Batch"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{batch.description}</p>
                
                {/* Dates */}
                <div className="flex items-center text-sm text-gray-600 mb-4 space-x-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-indigo-500" /> 
                    {batch.startDate}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-red-500" /> 
                    {batch.endDate}
                  </span>
                </div>

                <h3 className="text-sm font-medium text-gray-500 flex items-center mb-2">
                  <Users className="w-4 h-4 mr-2" />
                  Trainees ({batch.trainees.length})
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 max-h-32 overflow-y-auto">
                  {batch.trainees.map((trainee, index) => (
                    <li key={index} className="flex items-center space-x-2 p-2 rounded-md bg-gray-50">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{trainee.name} ({trainee.id})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p>No batches found. Try creating a new one!</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingBatch ? 'Edit Batch' : 'Create New Batch'}
            </h2>
            <form onSubmit={handleSaveBatch} className="space-y-4">
              <div>
                <label htmlFor="batchName" className="block text-sm font-medium text-gray-700">
                  Batch Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="batchName"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Q3 Sales Training"
                />
                {errors.batchName && <p className="mt-1 text-xs text-red-500">{errors.batchName}</p>}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.startDate && <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>}
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.endDate && <p className="mt-1 text-xs text-red-500">{errors.endDate}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="A brief description of the batch content."
                />
              </div>

              {/* Trainees */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Trainees</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={traineeInput}
                    onChange={(e) => setTraineeInput(e.target.value)}
                    className="flex-grow border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Employee ID(s) separated by commas"
                  />
                  <button
                    type="button"
                    onClick={handleAddTrainees}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add
                  </button>
                </div>
                {trainees.length > 0 && (
                  <ul className="mt-4 border border-gray-200 rounded-md max-h-48 overflow-y-auto">
                    {trainees.map((trainee) => (
                      <li
                        key={trainee.id}
                        className="flex items-center justify-between p-3 border-b last:border-b-0"
                      >
                        <span className="text-gray-800">{trainee.name} ({trainee.id})</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTrainee(trainee.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-end pt-4 space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-colors"
                >
                  Save Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchManagement;