import * as Contacts from "expo-contacts";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import ContactItem from "../../components/ContactItem";
import {
  EmergencyContactsType,
  useEmergencyContactContext,
} from "../../context/contactContext";
import { ContactItemProps } from "../../lib/types";

export default function ContactsPage() {
  const [contactList, setContactList] = useState<ContactItemProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { emerContacts, setEmerContacts } = useEmergencyContactContext();

  const validateContacts = async (contacts?: EmergencyContactsType) => {
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        const filteredData = data.map((contact) => {
          let number =
            (contact.phoneNumbers && contact.phoneNumbers[0].number) || "";
          let digitsOnly = number.replace(/\D/g, "");
          if (digitsOnly.length > 10) {
            digitsOnly = digitsOnly.slice(1);
          }
          number = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(
            3,
            6
          )} - ${digitsOnly.slice(6, 10)}`;

          const newContactData: ContactItemProps = {
            name: contact.name || "",
            phoneNumbers: number,
            emergency: false,
          };

          const contactNumber = newContactData.phoneNumbers;

          if (contacts && contacts.size > 0) {
            if (contacts.has(contactNumber)) {
              newContactData.emergency = true;
              setEmerContacts(
                (prevContacts) => new Set([...prevContacts, contactNumber])
              );
              return newContactData;
            } else {
              return newContactData;
            }
          } else {
            return newContactData;
          }
        });
        setContactList(filteredData);
      } else {
        alert("No contacts found");
      }
    } catch (error) {
      alert("Contacts could not be rendered");
      console.error("Error retreiving contacts: ", error);
    }
  };

  const getContacts = async () => {
    try {
      const storedPermission = await SecureStore.getItemAsync(
        "contactsPermission"
      );
      const emergencyContacts = await SecureStore.getItemAsync(
        "emergencyContacts"
      );
      if (storedPermission) {
        if (emergencyContacts !== null) {
          const newSet = JSON.parse(emergencyContacts);
          const emergencySet = new Set<string>(Array.from(newSet));
          validateContacts(emergencySet);
        } else {
          validateContacts();
        }
      } else {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          validateContacts();
          await SecureStore.setItemAsync("contactsPermission", "granted");
        } else {
          alert("Permission to access contacts was denied");
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error getting contacts: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getContacts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      {isLoading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <>
          {contactList.map((contact, index) => (
            <ContactItem
              name={contact.name}
              phoneNumbers={contact.phoneNumbers}
              key={index}
              emergency={contact.emergency}
            />
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    gap: 3,
    marginBottom: 35,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: "#683d7d",
  },
  loading: {
    fontSize: 20,
    marginTop: 10,
    color: "#683d7d",
  },
});
