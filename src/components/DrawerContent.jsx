import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';
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

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <Text style={styles.title}>Filter Kecamatan</Text>
                {kecamatanList.map((kecamatan) => (
                    <View key={kecamatan.id} style={styles.checkboxContainer}>
                        <CheckBox
                            value={selectedKecamatan[kecamatan.id] || false}
                            onValueChange={() =>
                                handleCheckboxChange(kecamatan.id)
                            }
                            color={
                                selectedKecamatan[kecamatan.id]
                                    ? '#1c769b'
                                    : undefined
                            }
                        />
                        <Text style={styles.label}>{kecamatan.nama}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.genanganContainer}>
                <Text style={styles.title}>Genangan</Text>
                <View key={'genangan'} style={styles.checkboxContainer}>
                    <CheckBox
                        value={genanganChecked}
                        onValueChange={handleGenanganChange}
                        color={genanganChecked ? '#1c769b' : undefined}
                    />
                    <Text style={styles.label}>Titik Genangan</Text>
                </View>
            </View>
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
});

export default DrawerContent;
