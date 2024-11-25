import {Text, View, XStack} from "tamagui";
import {Globe2} from "@tamagui/lucide-icons";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export function AppHeader() {

    const insets = useSafeAreaInsets();
    return (
        <View style={{paddingTop: insets.top, paddingBottom: 4}}>
            <XStack marginVertical={10}>
                <Globe2 marginHorizontal={12} color="$blue9"></Globe2>
                <Text fontFamily="$heading" fontSize={20}>localise.travel</Text>
            </XStack>
        </View>
    )
}