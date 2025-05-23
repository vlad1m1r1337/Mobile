import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../models/diary_entry.dart';
import '../../services/mood_icon_service.dart';


class DiaryEntryWidget extends StatelessWidget
{
  final DiaryEntry entry;
  final VoidCallback onTap;

  const DiaryEntryWidget({
    Key? key,
    required this.entry,
    required this.onTap,
  }) : super(key: key);


  @override
  Widget build(BuildContext context)
  {
    final formattedDate = DateFormat('dd MMM').format(DateTime.parse(entry.date));
    final moodIconPath = MoodIconService.moodToIcon(entry.mood);

return GestureDetector(
  onTap: onTap,
  child: Container(
    width: double.infinity,
    margin: const EdgeInsets.only(bottom: 16),
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: const Color.fromARGB(185, 126, 199, 248).withOpacity(0.6),
      borderRadius: BorderRadius.circular(12),
    ),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: <Widget>[
        Row(
          children: [
            Text(
              formattedDate,
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            const SizedBox(width: 16),
            Image.asset(
              moodIconPath,
              width: 24,
              height: 24,
              errorBuilder: (BuildContext context, Object error, StackTrace? stackTrace) {
                return const Icon(
                  Icons.error,
                  color: Colors.red,
                );
              },
            ),
          ],
        ),
        Flexible(
          child: Text(
            entry.title,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
            overflow: TextOverflow.ellipsis,
            textAlign: TextAlign.right,
          ),
        ),
      ],
    ),
  ),
);
  }
}