import {Text, View, XStack} from "tamagui";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {LocaliseLogo} from "./LocaliseLogo";
import {Globe2} from "@tamagui/lucide-icons";
import {LanguageSelector} from "./LanguageSelector";

export function AppHeader() {

    const insets = useSafeAreaInsets();
    return (
        <View style={{paddingTop: insets.top, paddingBottom: 4}}>
            <XStack marginVertical={10} alignItems={"center"} justifyContent={"space-between"}>
                <LocaliseLogo/>
                <LanguageSelector/>
            </XStack>
        </View>
    )
}