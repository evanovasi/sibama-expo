import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const DrawerContent = (props) => {
    const kecamatanList = [
        { id: 1, nama: 'Lowokwaru' },
        { id: 2, nama: 'Sukun' },
        { id: 3, nama: 'Blimbing' },
        { id: 4, nama: 'Kedungkandang' },
        { id: 5, nama: 'Klojen' },
    ];

    const initialSelectedKecamatan = kecamatanList.reduce((acc, kecamatan) => {
        acc[kecamatan.id] = true;
        return acc;
    }, {});

    const [selectedKecamatan, setSelectedKecamatan] = useState(
        initialSelectedKecamatan
    );
    const [genanganChecked, setGenanganChecked] = useState(true); // Set default value to true

    const handleCheckboxChange = (id) => {
        setSelectedKecamatan((prevSelected) => ({
            ...prevSelected,
            [id]: !prevSelected[id],
        }));
    };

    const handleGenanganChange = () => {
        setGenanganChecked((prevChecked) => !prevChecked);
    };

    const applyFilters = () => {
        const selectedKecamatanNames = Object.keys(selectedKecamatan)
            .filter((id) => selectedKecamatan[id])
            .map((id) => kecamatanList.find((kec) => kec.id == id).nama);
        props.navigation.navigate('MapScreen', { selectedKecamatanNames });
    };

    const CircleCheckbox = ({ checked, onChange }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onChange}
                style={styles.circleCheckbox}
            >
                {checked && <View style={styles.checkedCircle} />}
            </TouchableOpacity>
        );
    };

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <Text style={styles.title}>Filter Kecamatan</Text>
                {kecamatanList.map((kecamatan) => (
                    <View key={kecamatan.id} style={styles.checkboxContainer}>
                        <CircleCheckbox
                            checked={selectedKecamatan[kecamatan.id] || false}
                            onChange={() => handleCheckboxChange(kecamatan.id)}
                        />
                        <Text style={styles.label}>{kecamatan.nama}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.genanganContainer}>
                <Text style={styles.title}>Genangan</Text>
                <View key={'genangan'} style={styles.checkboxContainer}>
                    <CircleCheckbox
                        checked={genanganChecked}
                        onChange={handleGenanganChange}
                    />
                    <Text style={styles.label}>Titik Genangan</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}
                activeOpacity={0.7}
            >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    genanganContainer: {
        paddingHorizontal: 16,
        marginTop: -10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    label: {
        marginLeft: 8,
    },
    applyButton: {
        backgroundColor: '#1c769b',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        margin: 16,
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    circleCheckbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#1c769b',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#1c769b',
    },
});

export default DrawerContent;
