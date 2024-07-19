import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import PropTypes from 'prop-types';

const DrawerContent = ({ navigation }) => {
    const kecamatanList = [
        { nama: 'Lowokwaru' },
        { nama: 'Sukun' },
        { nama: 'Blimbing' },
        { nama: 'Kedungkandang' },
        { nama: 'Klojen' },
    ];

    const initialSelectedKecamatan = kecamatanList.reduce((acc, kecamatan) => {
        acc[kecamatan.nama] = true;
        return acc;
    }, {});

    const [selectedKecamatan, setSelectedKecamatan] = useState(
        initialSelectedKecamatan
    );
    const [genanganChecked, setGenanganChecked] = useState(true);

    const handleCheckboxChange = (nama) => {
        setSelectedKecamatan((prevSelected) => ({
            ...prevSelected,
            [nama]: !prevSelected[nama],
        }));
    };

    const handleGenanganChange = () => {
        setGenanganChecked((prevChecked) => !prevChecked);
    };

    const applyFilters = () => {
        const selectedKecamatanNames = Object.keys(selectedKecamatan).filter(
            (nama) => selectedKecamatan[nama]
        );
        navigation.navigate('MapScreen', { selectedKecamatanNames });
    };

    const CircleCheckbox = ({ checked, onChange }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onChange}
            style={styles.circleCheckbox}
        >
            {checked && <View style={styles.checkedCircle} />}
        </TouchableOpacity>
    );

    return (
        <DrawerContentScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Filter Kecamatan</Text>
                {kecamatanList.map((kecamatan) => (
                    <View key={kecamatan.nama} style={styles.checkboxContainer}>
                        <CircleCheckbox
                            checked={selectedKecamatan[kecamatan.nama] || false}
                            onChange={() =>
                                handleCheckboxChange(kecamatan.nama)
                            }
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
        backgroundColor: '#7A73E7',
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
        borderColor: '#7A73E7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#7A73E7',
    },
});

DrawerContent.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default DrawerContent;
