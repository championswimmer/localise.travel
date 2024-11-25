import {XStack, YStack} from "tamagui";
import LanguageSelector from "./components/LanguageSelector";

export default function LocaliseTravel() {
    return (
        <YStack>
            <XStack>
                <LanguageSelector id="lang-select-1"/>
            </XStack>
        </YStack>
    );
}
