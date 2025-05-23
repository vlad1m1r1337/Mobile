import 'package:diary_app/services/mood_icon_service.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../models/diary_entry.dart';

class CreateEntryDialog extends StatefulWidget {
  const CreateEntryDialog({super.key});

  @override
  _CreateEntryDialogState createState() => _CreateEntryDialogState();
}

class _CreateEntryDialogState extends State<CreateEntryDialog> {
  final _formKey = GlobalKey<FormState>();
  String _title = '';
  String _description = '';
  String _mood = 'Happy';
  final List<String> _moods = MoodIconService.moods;

  @override
  Widget build(BuildContext context) {
    final user = FirebaseAuth.instance.currentUser;
    final email = user?.email ?? 'Unknown';

    return AlertDialog(
      title: const Text('Create Entry'),
      content: Form(
        key: _formKey,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextFormField(
              maxLength: 50,
              decoration: const InputDecoration(labelText: 'Title'),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Title is required';
                }
                return null;
              },
              onChanged: (value) => _title = value,
            ),
            TextFormField(
              maxLength: 500,
              decoration: const InputDecoration(labelText: 'Description'),
              maxLines: 5,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Description is required';
                }
                return null;
              },
              onChanged: (value) => _description = value,
            ),
            DropdownButtonFormField<String>(
              value: _mood,
              decoration: const InputDecoration(labelText: 'Mood'),
              items: _moods.map((String mood) {
                return DropdownMenuItem<String>(
                  value: mood,
                  child: Text(mood),
                );
              }).toList(),
              onChanged: (String? newValue) {
                setState(() {
                  _mood = newValue!;
                });
              },
            )
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: () {
            if (_formKey.currentState!.validate()) {
              final newEntry = DiaryEntry(
                id: '',
                title: _title,
                description: _description,
                date: DateTime.now().toIso8601String(),
                mood: _mood,
                email: email,
              );
              Navigator.pop(context, newEntry);
            }
          },
          child: const Text('Add'),
        ),
      ],
    );
  }
}