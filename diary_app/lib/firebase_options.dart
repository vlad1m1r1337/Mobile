import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        return windows;
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyD_qEbvRbyJOrxsFmqSljEuWyjE1MYc7wo',
    appId: '1:10051491922:web:d8584d7b0d3ac82397e78b',
    messagingSenderId: '10051491922',
    projectId: 'diary-1131d',
    authDomain: 'diary-1131d.firebaseapp.com',
    storageBucket: 'diary-1131d.firebasestorage.app',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyBgLdKk-ZjRCPH0UwZ_500xT_FAM8tlcKM',
    appId: '1:10051491922:android:966e02b3f28871d197e78b',
    messagingSenderId: '10051491922',
    projectId: 'diary-1131d',
    storageBucket: 'diary-1131d.firebasestorage.app',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyDuG17ZSoU4ril1sIPojCOsOM8rRT_92gs',
    appId: '1:10051491922:ios:efaef8190ae364d097e78b',
    messagingSenderId: '10051491922',
    projectId: 'diary-1131d',
    storageBucket: 'diary-1131d.firebasestorage.app',
    androidClientId: '10051491922-poge5315dmutkgar92vfqpfel6bvb29h.apps.googleusercontent.com',
    iosClientId: '10051491922-onkkaaaqsirscatvhni9359n2r9b86vg.apps.googleusercontent.com',
    iosBundleId: 'com.example.diaryApp',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyDuG17ZSoU4ril1sIPojCOsOM8rRT_92gs',
    appId: '1:10051491922:ios:efaef8190ae364d097e78b',
    messagingSenderId: '10051491922',
    projectId: 'diary-1131d',
    storageBucket: 'diary-1131d.firebasestorage.app',
    androidClientId: '10051491922-poge5315dmutkgar92vfqpfel6bvb29h.apps.googleusercontent.com',
    iosClientId: '10051491922-onkkaaaqsirscatvhni9359n2r9b86vg.apps.googleusercontent.com',
    iosBundleId: 'com.example.diaryApp',
  );

  static const FirebaseOptions windows = FirebaseOptions(
    apiKey: 'AIzaSyD_qEbvRbyJOrxsFmqSljEuWyjE1MYc7wo',
    appId: '1:10051491922:web:a10cf1f9642ee45197e78b',
    messagingSenderId: '10051491922',
    projectId: 'diary-1131d',
    authDomain: 'diary-1131d.firebaseapp.com',
    storageBucket: 'diary-1131d.firebasestorage.app',
  );

}