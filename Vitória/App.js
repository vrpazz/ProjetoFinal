import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import ListaScreen from './ListaScreen'; 

const Stack = createStackNavigator();

export default function App() {
  const [listData, setListData] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="http://192.168.56.1:3000">
        <Stack.Screen name="Cadastro">
          {props => <CadastroScreen {...props} listData={listData} setListData={setListData} />}
        </Stack.Screen>
        <Stack.Screen name="Lista">
          {props => <ListaScreen {...props} listData={listData} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CadastroScreen({ navigation, listData, setListData }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [idade, setIdade] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCepBlur = async () => {
    if (cep.trim().length === 8) {
      setLoading(true);
      try {
        const responseCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { logradouro, bairro, localidade, uf } = responseCep.data;
        const enderecoCompleto = `${logradouro}, ${bairro}, ${localidade} - ${uf}`;
        setEndereco(enderecoCompleto);
      } catch (error) {
        alert('Erro ao buscar o endereço. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCadastro = async () => {
    if (!nome.trim() || !cpf.trim() || !idade.trim() || !cep.trim() || !endereco.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      const newCliente = { nome, cpf, idade, cep, endereco };
      const response = await axios.post('http://localhost:3000/api/clientes', newCliente);

      setListData(prevListData => [
        ...prevListData,
        response.data
      ]);

      setNome('');
      setCpf('');
      setIdade('');
      setCep('');
      setEndereco('');
    } catch (error) {
      alert('Erro ao cadastrar o cliente. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre um cliente</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          value={nome}
          onChangeText={setNome}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CPF:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Idade:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a idade"
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CEP:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o CEP"
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
          onBlur={handleCepBlur}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Endereço completo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Endereço completo"
          value={endereco}
          onChangeText={setEndereco}
          editable={false}
        />
      </View>
      {loading ? <ActivityIndicator size="large" color="#ff6347" /> : null}
      <View style={styles.buttonContainer}>
        <Button title="Cadastrar" onPress={handleCadastro} color="#4d4d4d" />
        <View style={styles.buttonSpacer} />
        <Button
          title="Ver Clientes"
          onPress={() => navigation.navigate('Lista')}
          color="#4d4d4d"
        />
      </View>
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
    fontSize: 32,
    marginBottom: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#a9a9a9',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonSpacer: {
    width: 20,
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
});
