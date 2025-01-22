// import DateTimePicker, {
//   DateTimePickerEvent,
// } from '@react-native-community/datetimepicker';
// import React, { useState } from 'react';
// import {
//   Alert,
//   FlatList,
//   Modal,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { TestFilterStyle } from '../Style/TestFilterStyle';

// type FilterProps = {
//   onFilter: (
//     startDate: string | null,
//     endDate: string | null,
//     resolution: string | null,
//   ) => void;
// };

// export default function TestFilter({ onFilter }: FilterProps) {
//   const [startDate, setStartDate] = useState<Date | undefined>(undefined);
//   const [endDate, setEndDate] = useState<Date | undefined>(undefined);
//   const [resolution, setResolution] = useState('');
//   const [showStartDatePicker, setShowStartDatePicker] = useState(false);
//   const [showEndDatePicker, setShowEndDatePicker] = useState(false);
//   const [showResolutionModal, setShowResolutionModal] = useState(false);

//   const resolutions: string[] = ['Timma', 'Dag', 'Månad', 'År']; //mockat

//   const handleStartDateChange = (
//     event: DateTimePickerEvent,
//     selectedDate?: Date,
//   ) => {
//     setShowStartDatePicker(false);
//     if (selectedDate) {
//       setStartDate(selectedDate);
//     }
//   };

//   const handleEndDateChange = (
//     event: DateTimePickerEvent,
//     selectedDate?: Date,
//   ) => {
//     setShowEndDatePicker(false);
//     if (selectedDate) {
//       setEndDate(selectedDate);
//     }
//   };

//   const handleResolutionChange = (selectedResolution?: string) => {
//     if (selectedResolution) {
//       setResolution(selectedResolution);
//       setShowResolutionModal(false);
//     }
//   };

//   const handleFilter = () => {
//     if (startDate && endDate && endDate <= startDate) {
//       Alert.alert('Fel', 'Slutdatum måste vara senare än startdatum.');
//       return;
//     }
//     if ((!startDate && endDate) || (!endDate && startDate)) {
//       Alert.alert('Fel', 'Fyll i start och slutdatum.');
//       return;
//     }
//     if (!startDate && !endDate && !resolution) {
//       onFilter(null, null, null);
//     }
//     if (!startDate && !endDate && resolution) {
//       onFilter(null, null, resolution);
//       // renders everything at the moment- but this will render (after modifications) according to
//       // selected resolution after api-access
//     } else {
//       onFilter(
//         startDate?.toISOString().split('T')[0] || '',
//         endDate?.toISOString().split('T')[0] || '',
//         resolution || '',
//       );
//     }
//   };

//   const handleStartReset = () => {
//     setStartDate(undefined);
//   };

//   const handleEndReset = () => {
//     setEndDate(undefined);
//   };

//   const handleResolutionReset = () => {
//     setResolution('');
//   };

//   return (
//     <View style={TestFilterStyle.container}>
//       <View style={TestFilterStyle.row}>
//         <View style={TestFilterStyle.filterBtnContainer}>
//           <TouchableOpacity
//             style={TestFilterStyle.button}
//             onPress={() => setShowStartDatePicker(true)}
//           >
//             <Text style={TestFilterStyle.buttonText}>
//               {startDate ? startDate.toISOString().split('T')[0] : 'Från datum'}
//             </Text>
//           </TouchableOpacity>
//           {startDate && (
//             <TouchableOpacity
//               onPress={handleStartReset}
//               style={TestFilterStyle.resetButton}
//             >
//               <Icon
//                 name="close"
//                 size={16}
//                 color="#333"
//               />
//             </TouchableOpacity>
//           )}
//           {showStartDatePicker && (
//             <DateTimePicker
//               value={startDate || new Date()}
//               mode="date"
//               display="default"
//               onChange={handleStartDateChange}
//             />
//           )}
//           <TouchableOpacity
//             style={TestFilterStyle.button}
//             onPress={() => setShowEndDatePicker(true)}
//           >
//             <Text style={TestFilterStyle.buttonText}>
//               {endDate ? endDate.toISOString().split('T')[0] : 'Till datum'}
//             </Text>
//           </TouchableOpacity>
//           {endDate && (
//             <TouchableOpacity
//               onPress={handleEndReset}
//               style={TestFilterStyle.resetButton}
//             >
//               <Icon
//                 name="close"
//                 size={16}
//                 color="#333"
//               />
//             </TouchableOpacity>
//           )}
//           {showEndDatePicker && (
//             <DateTimePicker
//               value={endDate || new Date()}
//               mode="date"
//               display="default"
//               onChange={handleEndDateChange}
//             />
//           )}

//           <TouchableOpacity
//             style={TestFilterStyle.button}
//             onPress={() => setShowResolutionModal(true)}
//           >
//             <Text style={TestFilterStyle.buttonText}>
//               {resolution ? resolution : 'Upplösning'}
//             </Text>
//           </TouchableOpacity>
//           {resolution && (
//             <TouchableOpacity
//               onPress={handleResolutionReset}
//               style={TestFilterStyle.resetButton}
//             >
//               <Icon
//                 name="close"
//                 size={16}
//                 color="#333"
//               />
//             </TouchableOpacity>
//           )}
//         </View>
//         <TouchableOpacity
//           style={TestFilterStyle.searchButton}
//           onPress={handleFilter}
//         >
//           <Text style={TestFilterStyle.searchButtonText}>Sök</Text>
//         </TouchableOpacity>
//       </View>

//       <Modal
//         visible={showResolutionModal}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setShowResolutionModal(false)}
//       >
//         <View style={TestFilterStyle.modalContainer}>
//           <View style={TestFilterStyle.modalContent}>
//             <Text style={TestFilterStyle.modalTitle}>Välj upplösning</Text>
//             <FlatList
//               data={resolutions}
//               keyExtractor={(item) => item}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={TestFilterStyle.modalItem}
//                   onPress={() => handleResolutionChange(item)}
//                 >
//                   <Text style={TestFilterStyle.modalItemText}>
//                     {item.toString()}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             />
//             <TouchableOpacity
//               style={TestFilterStyle.modalCloseButton}
//               onPress={() => setShowResolutionModal(false)}
//             >
//               <Text style={TestFilterStyle.modalCloseButtonText}>Stäng</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }
