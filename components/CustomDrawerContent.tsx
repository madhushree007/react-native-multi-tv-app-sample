import { scaledPixels } from "@/hooks/useScale";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View, StyleSheet, Image, Platform, Text } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { DefaultFocus, SpatialNavigationFocusableView, SpatialNavigationRoot } from "react-tv-space-navigation";
import { useRouter } from "expo-router";
import { useMenuContext } from "@/components/MenuContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from 'react-i18next';

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const { isOpen: isMenuOpen, toggleMenu } = useMenuContext();
  const styles = useDrawerStyles();
  const {top, right, bottom, left} = useSafeAreaInsets();
  const { t, i18n } = useTranslation();
  const drawerItems = [
    { name: '/', label: t('drawer.index') },
    { name: 'explore', label: t('drawer.explore')},
    { name: 'tv', label: t('drawer.tv')},
  ];
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  return (
    <SpatialNavigationRoot isActive={isMenuOpen}>
      <DrawerContentScrollView {...props} style={styles.container} scrollEnabled={false}>
        <View style={styles.header}>
          <Image source={require('@/assets/images/logo.png')} style={styles.profilePic} />
          <Text style={styles.userName}>Pioneer Tom</Text>
          <Text style={styles.switchAccount}>Switch account</Text>
          <Text style={styles.switchLanguage}>Switch Language</Text>
          <Picker
            selectedValue={i18n.language}
            onValueChange={(itemValue: string) => changeLanguage(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Français" value="fr" />
            <Picker.Item label="Español" value="es" />
      </Picker>
        </View>
        {drawerItems.map((item, index) => (
         index === 0 ? (
          <DefaultFocus key={index}>
            <SpatialNavigationFocusableView onSelect={() => { console.log(item.name); toggleMenu(false); router.push(item.name); }}>
              {({ isFocused }) => (
                <View style={[styles.menuItem, isFocused && styles.menuItemFocused]}>
                  <Text style={[styles.menuText, isFocused && styles.menuTextFocused]}>{item.label}</Text>
                </View>
              )}
            </SpatialNavigationFocusableView>
          </DefaultFocus>
        ) : (
          <SpatialNavigationFocusableView key={index} onSelect={() => { console.log(item.name); toggleMenu(false);  router.push(item.name); }}>
            {({ isFocused }) => (
              <View style={[styles.menuItem, isFocused && styles.menuItemFocused]}>
                <Text style={[styles.menuText, isFocused && styles.menuTextFocused]}>{item.label}</Text>
              </View>
            )}
          </SpatialNavigationFocusableView>
        )
      ))}
      </DrawerContentScrollView>
    </SpatialNavigationRoot>
  );
}

const useDrawerStyles = function () {
  return StyleSheet.create({
    container: {
      left: Platform.OS === "ios" ? -80: 0,
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      paddingTop: scaledPixels(20),
    },
    header: {
      padding: scaledPixels(16),
    },
    profilePic: {
      width: scaledPixels(180),
      height: scaledPixels(180),
      borderRadius: scaledPixels(20),
    },
    userName: {
      color: 'white',
      fontSize: scaledPixels(32),
      marginTop: scaledPixels(16),
    },
    switchAccount: {
      color: 'gray',
      fontSize: scaledPixels(20),
    },
    searchContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: scaledPixels(12),
      marginHorizontal: scaledPixels(16),
      marginVertical: scaledPixels(8),
      borderRadius: scaledPixels(4),
    },
    searchText: {
      color: 'gray',
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: scaledPixels(16),
      paddingBottom: scaledPixels(8),
      paddingStart: scaledPixels(32),
    },
    menuItemFocused: {
      backgroundColor: 'white',
    },
    icon: {
      width: scaledPixels(24),
      height: scaledPixels(24),
      marginRight: scaledPixels(16),
    },
    menuText: {
      color: 'white',
      fontSize: scaledPixels(32),
    },
    menuTextFocused: {
      color: 'black',
    },
    switchLanguage: {
      paddingTop: scaledPixels(10),
      paddingBottom: scaledPixels(6),
      color: 'white',
      fontSize: scaledPixels(26),
    },
    picker: {
      height: 40,
      width: '60%'
    }
  });
};