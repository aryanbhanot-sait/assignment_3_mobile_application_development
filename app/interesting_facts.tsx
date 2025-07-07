import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, FlatList } from 'react-native';
import { fetchDateFact } from '../components/getfacts';

export default function Interesting_Facts() {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [fact, setFact] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

    const handleFetchFact = async () => {
        if (!selectedMonth || !selectedDay || isNaN(Number(selectedDay))) return;
        setLoading(true);
        const result = await fetchDateFact(selectedMonth, selectedDay);
        setFact(result || '');
        setLoading(false);
    };

    useEffect(() => {
        handleFetchFact();
    }, [selectedMonth, selectedDay]);

    return (
        <View style={styles.main}>
            <Text style={styles.label}>Select Month</Text>
            <Pressable
                style={styles.dropdownButton}
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <Text style={styles.dropdownText}>
                    {selectedMonth ? `Month ${selectedMonth}` : 'Choose a month'}
                </Text>
            </Pressable>

            {isDropdownOpen && (
                <View style={styles.dropdown}>
                    <FlatList
                        data={months}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <Pressable
                                style={styles.dropdownItem}
                                onPress={() => {
                                    setSelectedMonth(item);
                                    setIsDropdownOpen(false);
                                }}
                            >
                                <Text style={styles.itemText}>{item}</Text>
                            </Pressable>
                        )}
                    />
                </View>
            )}

            <Text style={styles.label}>Enter Day</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="e.g., 25"
                value={selectedDay}
                onChangeText={setSelectedDay}
                maxLength={2}
            />

            {loading && <Text style={styles.status}>Loading...</Text>}
            {!loading && fact !== '' && (
                <Text style={styles.factText}>{fact}</Text>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 20,
        paddingTop: 80,
    },
    container: { marginBottom: 20 },
    label: { fontSize: 16, marginBottom: 5 },
    dropdownButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
    },
    dropdownText: {
        fontSize: 16,
    },
    dropdown: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        maxHeight: 200,
        backgroundColor: '#fff',
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemText: {
        fontSize: 16,
    },
    monthBtn: {
        width: '20%',
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 5,
        alignItems: 'center',
    },
    selected: {
        backgroundColor: '#007AFF',
    },
    btnText: {
        color: '#000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        marginBottom: 20,
    },
    status: {
        fontSize: 18,
        color: 'gray',
        marginTop: 20,
    },
    factText: {
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center',
    },
});