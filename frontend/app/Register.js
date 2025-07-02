// import React from 'react';
// import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';

// const RegisterSchema = Yup.object().shape({
//   firstName: Yup.string().required('Required'),
//   lastName: Yup.string().required('Required'),
//   email: Yup.string().email('Invalid').required('Required'),
//   password: Yup.string().min(6).required('Required'),
//   age: Yup.string().required('Required'),
//   zip: Yup.string().length(5, 'Must be 5 digits').required('Required'),
// });

// export default function Register({ navigation }) {
//   const handleSubmit = async (values) => {
//     try {
//       await axios.post('http://127.0.0.1:8000/api/register/', values); // Django endpoint
//       Alert.alert("Success", "User registered successfully!");
//     } catch (error) {
//       Alert.alert("Error", "Failed to register user.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Yay! You're just a few steps away to make a healthy difference</Text>
//       <Text style={styles.sub}>Register</Text>
//       <Formik
//         initialValues={{ firstName: '', lastName: '', email: '', password: '', age: '', zip: '' }}
//         validationSchema={RegisterSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ handleChange, handleSubmit, values, errors }) => (
//           <>
//             {['firstName', 'lastName', 'email', 'password', 'age', 'zip'].map((field) => (
//               <TextInput
//                 key={field}
//                 style={styles.input}
//                 placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                 onChangeText={handleChange(field)}
//                 value={values[field]}
//                 secureTextEntry={field === 'password'}
//               />
//             ))}
//             <Button title="Next: Health Goals" onPress={handleSubmit} />
//           </>
//         )}
//       </Formik>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, backgroundColor: '#fff', flex: 1 },
//   header: { fontSize: 18, marginBottom: 10 },
//   sub: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
//   input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10, borderRadius: 5 },
// });


import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  age: Yup.string().required('Age is required'),
  zip: Yup.string().length(5, 'Must be 5 digits').required('Zip code is required'),
});

export default function Register({ navigation }) {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post('http://127.0.0.1:8000/neu_api/register/', {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        age: values.age,
        zip_code: values.zip,
      });
      Alert.alert('Success', 'Registration successful!');
      resetForm();
      // navigation.navigate('NextPage'); // Optional next step
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome to NEU</Text>
      <Text style={styles.sub}>Register</Text>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '', age: '', zip: '' }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            {['firstName', 'lastName', 'email', 'password', 'age', 'zip'].map((field) => (
              <View key={field} style={styles.inputGroup}>
                <TextInput
                  style={styles.input}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  onChangeText={handleChange(field)}
                  onBlur={handleBlur(field)}
                  value={values[field]}
                  secureTextEntry={field === 'password'}
                />
                {touched[field] && errors[field] && <Text style={styles.error}>{errors[field]}</Text>}
              </View>
            ))}
            <View style={styles.button}>
              <Button title="Next: Health Goals" onPress={handleSubmit} color="#00C853" />
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#444',
  },
  sub: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
