import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import Button from "@/components/ui/button";
import { cardSchema, CardFormData } from "./card-schema";
import { useEffect } from "react";

const STORAGE_KEY = "cardInformation";

export default function CardInformationForm() {
  const { control, handleSubmit, setValue, reset } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiry: "",
      cvv: "",
      cardImage: "",
    },
  });

  useEffect(() => {
  (async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved) {
      reset(JSON.parse(saved));
    }
  })();
}, []);


  const onSubmit = async (data: CardFormData) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    alert("Card information saved");
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setValue("cardImage", result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card Information</Text>

      {/** Card Number */}
      <Controller
        control={control}
        name="cardNumber"
        render={({ field, fieldState }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              keyboardType="number-pad"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
            />
            {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
          </>
        )}
      />

      {/** Card Holder */}
      <Controller
        control={control}
        name="cardHolder"
        render={({ field, fieldState }) => (
          <>
            <TextInput 
            style={styles.input} 
            placeholder="Card Holder" 
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            />
            {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
          </>
        )}
      />

      {/** Expiry */}
      <Controller
        control={control}
        name="expiry"
        render={({ field, fieldState }) => (
          <>
            <TextInput 
            style={styles.input}
             placeholder="MM/YY" 
             value={field.value}
             onChangeText={field.onChange}
             onBlur={field.onBlur}
            />
            {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
          </>
        )}
      />

      {/** CVV */}
      <Controller
        control={control}
        name="cvv"
        render={({ field, fieldState }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="CVV"
              secureTextEntry
              keyboardType="number-pad"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
            />
            {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
          </>
        )}
      />

      {/** Image */}
      <Controller
        control={control}
        name="cardImage"
        render={({ field }) => (
          <>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Text>Select / Take card photo</Text>
            </TouchableOpacity>
            {field.value ? (
              <Image source={{ uri: field.value }} style={styles.image} />
            ) : null}
          </>
        )}
      />

      <Button onPress={handleSubmit(onSubmit)}>Save</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  imageButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
});
