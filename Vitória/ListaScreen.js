import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function ListaScreen({ listData }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Clientes Cadastrados</Text>
      {listData.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum cliente cadastrado.</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={listData}
          keyExtractor={item => item.id.toString()} // Changed keyExtractor to use item.id.toString()
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.label}>Nome: </Text>
              <Text>{item.nome}</Text>
              <Text style={styles.label}>CPF: </Text>
              <Text>{item.cpf}</Text>
              <Text style={styles.label}>Idade: </Text>
              <Text>{item.idade}</Text>
              <Text style={styles.label}>CEP: </Text>
              <Text>{item.cep}</Text>
              <Text style={styles.label}>Endereço: </Text>
              <Text>{item.endereco}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#000',
    fontWeight: 'bold',
    },
  list: {
    width: '100%',
  },
  listItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
});
