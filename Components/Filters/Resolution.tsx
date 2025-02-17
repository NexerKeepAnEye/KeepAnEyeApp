import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { width } from '../../Style/Dimensions';
import { ResolutionStyle } from '../../Style/ResolutionStyle';
import { searchButtonStyle } from '../../Style/SearchButtonStyle';

interface ResolutionProps {
  setSelectedResolution: (resolution: string) => void;
}

export function Resolution({ setSelectedResolution }: ResolutionProps) {
  const [resolution, setResolution] = useState('');
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const resolutions: string[] = ['Timma', 'Dag', 'Månad', 'År'];

  function handleResolutionChange(selectedResolution: string) {
    setResolution(selectedResolution);
    setSelectedResolution(selectedResolution);
    setShowResolutionModal(false);
  }

  useEffect(() => {
    setResolution('Timma');
    setSelectedResolution('Timma');
  }, []);

  return (
    <View style={ResolutionStyle.container}>
      <View style={ResolutionStyle.resolutionContainer}>
        <TouchableOpacity
          style={ResolutionStyle.button}
          onPress={() => setShowResolutionModal(true)}
        >
          <Text style={ResolutionStyle.buttonText}>
            {resolution ? resolution : 'Upplösning'}
          </Text>
        </TouchableOpacity>
      </View>
      {resolution && (
        <TouchableOpacity
          onPress={() => setResolution('')}
          style={searchButtonStyle.resolutionButtonReset}
        >
          <Icon
            name="close"
            size={width * 0.03}
            color="#333"
          />
        </TouchableOpacity>
      )}
      {showResolutionModal && (
        <Modal
          visible={showResolutionModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowResolutionModal(false)}
        >
          <View style={ResolutionStyle.modalContainer}>
            <View style={ResolutionStyle.modalContent}>
              {/* <Text style={TestFilterStyle.modalTitle}>Upplösning</Text> */}
              <FlatList
                data={resolutions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={ResolutionStyle.modalItem}
                    onPress={() => handleResolutionChange(item)}
                  >
                    <Text style={ResolutionStyle.modalItemText}>
                      {item.toString()}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={ResolutionStyle.modalCloseButton}
                onPress={() => setShowResolutionModal(false)}
              >
                <Text style={ResolutionStyle.modalCloseButtonText}>Stäng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
