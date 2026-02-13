import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  DimensionValue,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useMutation } from "@tanstack/react-query";

import { ButtonSelector, AppHeading, AppText } from "#components";
import { appStyles } from "#styles";
import { API_BASE } from "../constants";

interface ContactFormData {
  email?: string;
  message: string;
}

const submitContactForm = async (data: ContactFormData) => {
  const response = await fetch(`${API_BASE}/contact-forms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to submit contact form");
  }

  return response.json();
};

export const DetailsScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      setEmail("");
      setMessage("");
    },
  });

  const handleSubmit = () => {
    if (!message.trim()) return;

    const formData: ContactFormData = {
      message: message.trim(),
    };

    if (email.trim()) {
      formData.email = email.trim();
    }

    mutation.mutate(formData);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AppHeading screenName="Details" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <ButtonSelector
          icon="about"
          text="About"
          onPress={() => {
            navigation.navigate("About");
          }}
          style={{ marginTop: 19, width: appStyles.maxWidth as DimensionValue }}
        />

        <LinearGradient
          colors={["#FFFFFF", "#FFF8F0", "#FFF0E6", "#F5E6FF"]}
          style={styles.formContainer}
        >
          <AppText namedStyle="h2" isBold style={styles.formTitle}>
            Give your suggestion
          </AppText>

          <AppText style={styles.formDescription}>
            You have suggestions for new applications? Please share them with
            us.
          </AppText>

          <View style={styles.inputContainer}>
            <AppText style={styles.label}>Email (optional)</AppText>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <AppText style={styles.label}>Message *</AppText>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Write your suggestion here..."
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {mutation.isError && (
            <AppText isError style={styles.errorText}>
              Failed to send message. Please try again.
            </AppText>
          )}

          {mutation.isSuccess && (
            <AppText style={styles.successText}>
              Suggestion sent successfully!
            </AppText>
          )}

          <TouchableOpacity
            style={[
              styles.submitButton,
              (!message.trim() || mutation.isPending) &&
                styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!message.trim() || mutation.isPending}
          >
            {mutation.isPending ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <AppText white isBold>
                Send Message
              </AppText>
            )}
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 24,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  formTitle: {
    marginBottom: 20,
    textAlign: "center",
    color: "#20809E",
  },
  formDescription: {
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    // dirty white text, but not pure white
    color: "#333",
    fontSize: 14,
  },
  input: {
    // dirty white background
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E8EDF2",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: "#04ADEF",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: "#B0D4E8",
  },
  errorText: {
    textAlign: "center",
    marginBottom: 12,
  },
  successText: {
    textAlign: "center",
    marginBottom: 12,
    color: "#28A745",
  },
});
