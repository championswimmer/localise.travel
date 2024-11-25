import {config as configBase} from '@tamagui/config/v3'
import {createTamagui} from 'tamagui'
import {createDmSansFont} from "@tamagui/font-dm-sans";

export const config = createTamagui({
    ...configBase,
    fonts: {
        heading: createDmSansFont({family: 'DMSansBold', face: {700: {normal: 'DMSans-Bold'}}}),
        body: createDmSansFont({family: 'DMSans', face: {400: {normal: 'DMSans-Regular'}}}),
        silkscreen: createDmSansFont({family: 'DMSans', face: {400: {normal: 'DMSans-Regular'}}}),
        mono: configBase.fonts.mono
    }
})

export default config

export type Conf = typeof config

declare module 'tamagui' {
    interface TamaguiCustomConfig extends Conf {
    }
}
