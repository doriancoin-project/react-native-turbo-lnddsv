# react-native-turbo-lndltc

A pure C++-only TurboModule for [lndltc](https://github.com/ltcsuite/lnd).

Easily embed and interact with the Lightning Network client lnd inside an
app with a convenient API. This lib uses lnd's
[falafel](https://github.com/lightninglabs/falafel) bindings in order to run
lnd embedded inside an app.

* ⚡️ Runs [lndltc](https://github.com/ltcsuite/lnd) embedded inside your
app

* 🕺 Epic [C++ TurboModule](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/turbo-modules-xplat.md)
bindings for interacting with lndltc, sharing the same source-code for all
platforms

* 🤯 Convenient and simple API for all lnd gRPC methods and server/bidi streams

* 🤓 Type-safety and auto-complete for all protobufs, using
[protobuf-es](https://github.com/bufbuild/protobuf-es)

* 📦 Unopinionated core bindings for other protobuf libraries. Zero dependencies

* 👷‍♂️ Provide your own lndltc binaries, or use our prebuilt ones

### Platform support:

```
✅ Android
✅ iOS
✅ macOS
🤨 Linux via react-native-web and NodeJS C++ Addon (WIP)
🚫 Windows (planned)
🚫 Web
✅ Jest mocks (all gRPC methods not yet mocked)
```

An opinionated API `react-native-turbo-lndltc` using protobuf-es bindings is
provided for lnd's protobufs, giving auto-complete and type-safety for all
protobufs and gRPC methods.

An unopinionated core API `react-native-turbo-lndltc/core` to lnd's falafel
bindings is also available if you want to use another protobuf library.
This API let's you send and receive protobufs as base64-encoded strings,
which you can then encode/decode yourself.


> [!NOTE]
> The opinionated API is still in development and may change in the future.

## Installation

This lib requires
[new architecture](https://reactnative.dev/docs/the-new-architecture/landing-page)
enabled in your app. It will not work on the old architecture and there are no
plans to support it.

1. Install the package:

```sh
yarn add react-native-turbo-lndltc

## If you wish to use the protobuf-es bindings:
yarn add @bufbuild/protobuf
```

2. Lnd binaries needs to be side-loaded manually for your app.
Follow the instructions here for each platform:

### Android:
Download the latest `lnd-cgo-android.zip` from [litecoin-foundation/react-native-turbo-lndltc/releases](https://github.com/litecoin-foundation/react-native-turbo-lndltc/releases)
containing lnd `.so` binaries and unzip the files to
`<project root>/android/app/src/main/jniLibs`.
The structure should look like this:
```
android/app/src/main/jniLibs
├── arm64-v8a
│   └── liblnd.so
├── armeabi-v7a
│   └── liblnd.so
├── x86
│   └── liblnd.so
└── x86_64
    └── liblnd.so
```

Note: CMake will by default look for the files in
`../../../android/app/src/main/jniLibs`, starting from
`<project root>/node_modules/react-native-turbo-lndltc/cpp`.

If you have another structure or wish to customize it, you can pass in
`-DLND_JNILIBS_PATH` to CMake. For example from your app/build.gradle:
```
defaultConfig {
  // Other configs

  externalNativeBuild {
      cmake {
          arguments "-DLND_JNILIBS_PATH=/your/path/here"
      }
  }
}
```

### iOS/macOS:
Download the latest `liblnd-{ios|mac}.zip` file from
[litecoin-foundation/react-native-turbo-lndltc/releases](https://github.com/litecoin-foundation/react-native-turbo-lndltc/releases)
and unzip it. Then rename `liblnd-fat.a` to `liblnd.a` and place it in
`<project root>/{ios|macos}/liblnd.a`. Navigate to the folder in Finder and drag
the `liblnd.a` file into the Xcode project root. Check "Copy items if needed".
Be sure to also select the correct app target.

Note: You may need to also add libresolv to the Xcode project. Go to your app
target in Xcode, then select the General tab. Find the "Frameworks, Libraries,
and Embedded Content" section and click on the "+" button. Search for the
`libresolv.tbd` file and add it.

> [!NOTE]
> If you wish to compile your own lnd binaries, you can follow the instructions
> [here](https://github.com/hsjoberg/lnd/tree/cshared/mobile#cgo-build).

> [!NOTE]
> Instead of manually downloading the binaries, you can also use a convenience script.  From the
> root of your project, run:
>
> ```
> node node_modules/react-native-turbo-lndltc/src/fetch-lnd.js
> ```

3. Done!

## Usage

```TSX
import { Button, View } from "react-native";
import { start, getInfo } from "react-native-turbo-lndltc";

export default function App() {
  const onPressStart = async () => {
    await start(
      `--lnddir="<TODO>" --noseedbackup --nolisten --litecoin.active --litecoin.mainnet --litecoin.node=neutrino --feeurl="https://litecoinspace.org/api/v1/fees/recommended-lnd" --routing.assumechanvalid --tlsdisableautofill --neutrino.connect=192.168.10.120:19444`
    );
  }

  const onPressGetInfo = async () => {
    const info = await getInfo({});
    console.log("syncedToChain", info.syncedToChain);
  }

  return (
    <View>
      <Button title="start" onPress={onPressStart} />
      <Button title="getInfo" onPress={onPressGetInfo} />
    </View>
  )
}

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

This library is a fork of [react-native-turbo-lnd](https://github.com/hsjoberg/react-native-turbo-lnd), which is offered under the MIT License.

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
