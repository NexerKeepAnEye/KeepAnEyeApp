import React, { useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { TestFilterStyle } from '../../Style/ResolutionStyle';

interface ResolutionProps {
  setSelectedResolution: (resolution: string) => void;
}

export function Resolution({ setSelectedResolution }: ResolutionProps) {
  const [resolution, setResolution] = useState('');
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const resolutions: string[] = ['Timma', 'Dag', 'Månad', 'År'];

  // function handleResolutionReset() {
  //   setResolution('');
  // }

  function handleResolutionChange(selectedResolution: string) {
    setResolution(selectedResolution);
    setSelectedResolution(selectedResolution);
    setShowResolutionModal(false);
  }

  return (
    <View>
      <TouchableOpacity
        style={TestFilterStyle.button}
        onPress={() => setShowResolutionModal(true)}
      >
        <Text style={TestFilterStyle.buttonText}>
          {resolution ? resolution : 'Upplösning'}
        </Text>
      </TouchableOpacity>
      {/* {resolution && (
        <TouchableOpacity
          onPress={() => handleResolutionReset()}
          style={TestFilterStyle.resetButton}
        >
          <Icon
            name="close"
            size={16}
            color="#333"
          />
        </TouchableOpacity>
      )} */}
      {showResolutionModal && (
        <Modal
          visible={showResolutionModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowResolutionModal(false)}
        >
          <View style={TestFilterStyle.modalContainer}>
            <View style={TestFilterStyle.modalContent}>
              {/* <Text style={TestFilterStyle.modalTitle}>Upplösning</Text> */}
              <FlatList
                data={resolutions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={TestFilterStyle.modalItem}
                    onPress={() => handleResolutionChange(item)}
                  >
                    <Text style={TestFilterStyle.modalItemText}>
                      {item.toString()}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={TestFilterStyle.modalCloseButton}
                onPress={() => setShowResolutionModal(false)}
              >
                <Text style={TestFilterStyle.modalCloseButtonText}>Stäng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
