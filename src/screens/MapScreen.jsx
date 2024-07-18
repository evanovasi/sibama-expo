import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import { instance } from '../api/common';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MapScreen = ({ navigation, route }) => {
    const [allFeatures, setAllFeatures] = useState([]);
    const [features, setFeatures] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [selectedPolylineId, setSelectedPolylineId] = useState(null);
    const [popupInfo, setPopupInfo] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setSpinner(true);
            const response = await instance.get();
            const lineStringFeatures = response.data.features.filter(
                (feature) => feature.geometry.type === 'LineString'
            );
            setAllFeatures(lineStringFeatures);
            setFeatures(lineStringFeatures); // Set default features
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setSpinner(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (route.params?.selectedKecamatanNames) {
            filterFeatures(route.params.selectedKecamatanNames);
        }
    }, [route.params?.selectedKecamatanNames]);

    const filterFeatures = useCallback(
        (selectedKecamatanNames) => {
            const filteredFeatures = allFeatures.filter((feature) =>
                selectedKecamatanNames.includes(feature.properties.kecamatan)
            );
            setFeatures(filteredFeatures);
        },
        [allFeatures]
    );

    const handlePolylinePress = (event, info) => {
        const { coordinate } = event.nativeEvent;
        const { id, jalan } = info;
        setPopupInfo({ jalan, ...coordinate });

        if (selectedPolylineId === id) {
            setSelectedPolylineId(null);
        } else {
            setSelectedPolylineId(id);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Spinner
                visible={spinner}
                textContent={'Mengambil Data'}
                textStyle={styles.spinnerTextStyle}
            />
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: -7.966677170644319,
                    longitude: 112.63286379647433,
                    latitudeDelta: 0.19,
                    longitudeDelta: 0.14,
                }}
            >
                {features.map((feature, index) => (
                    <Polyline
                        key={index}
                        coordinates={feature.geometry.coordinates.map(
                            (coord) => ({
                                latitude: parseFloat(coord[1]),
                                longitude: parseFloat(coord[0]),
                            })
                        )}
                        onPress={(event) =>
                            handlePolylinePress(event, {
                                id: feature.properties.id,
                                jalan: feature.properties.nama_jalan,
                            })
                        }
                        strokeColor={
                            feature.properties.status_limpasan === 'MELIMPAH'
                                ? 'red'
                                : feature.properties.status_limpasan ===
                                  'RAWAN MELIMPAH'
                                ? 'orange'
                                : feature.properties.id === selectedPolylineId
                                ? 'yellow'
                                : '#1c769b'
                        }
                        strokeWidth={1.8}
                        tappable={true}
                    />
                ))}
                {popupInfo && (
                    <Marker
                        coordinate={{
                            latitude: popupInfo.latitude,
                            longitude: popupInfo.longitude,
                        }}
                    >
                        <View style={styles.popup}>
                            <Text numberOfLines={2}>{popupInfo.jalan}</Text>
                        </View>
                    </Marker>
                )}
            </MapView>
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.fab}
                onPress={() => navigation.openDrawer()}
            >
                <Icon name='filter-list' size={30} color='white' />
            </TouchableOpacity>
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF',
    },
    popup: {
        maxWidth: 150,
        maxHeight: 45,
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#1c769b',
        borderRadius: 50,
        padding: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});
