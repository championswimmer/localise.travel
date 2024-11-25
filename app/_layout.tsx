import "../tamagui-web.css";

import {useEffect} from "react";
import {StatusBar, useColorScheme} from "react-native";
import {DarkTheme, DefaultTheme, ThemeProvider,} from "@react-navigation/native";
import {useFonts} from "expo-font";
import {SplashScreen, Stack} from "expo-router";
import {Provider} from "./Provider";
import {Text, useTheme, XStack} from "tamagui";
import {Globe2} from "@tamagui/lucide-icons";
import {SafeAreaView} from "react-native-safe-area-context";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontLoaded, fontError] = useFonts({
        DMSans: require("@tamagui/font-dm-sans/fonts/static/DMSans-Regular.ttf"),
        DMSansBold: require("@tamagui/font-dm-sans/fonts/static/DMSans-Bold.ttf"),

    });

    useEffect(() => {
        if (fontLoaded || fontError) {
            // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
            SplashScreen.hideAsync();
        }
    }, [fontLoaded, fontError]);

    if (!fontLoaded && !fontError) {
        return null;
    }

    return (
        <Providers>
            <RootLayoutNav/>
        </Providers>
    );
}

const Providers = ({children}: { children: React.ReactNode }) => {
    return <Provider>{children}</Provider>;
};

function RootLayoutNav() {
    const colorScheme = useColorScheme();
    const theme = useTheme();
    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <StatusBar
                barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
            />
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        header: () => (
                            <SafeAreaView>
                                <XStack>
                                    <Globe2 marginHorizontal={12} color="$blue9"></Globe2>
                                    <Text fontFamily="$heading" fontSize={20}>localise.travel</Text>
                                </XStack>
                            </SafeAreaView>

                        )
                    }}
                />
            </Stack>
        </ThemeProvider>
    );
}
