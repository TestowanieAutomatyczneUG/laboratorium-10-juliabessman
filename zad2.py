
import unittest
from unittest.mock import *

class Note:
    def __init__(self, name, note):
        if type(name) != str:
            raise TypeError('Name must be a string')
        if name == '':
            raise ValueError('Name must not be empty')
        if type(note) != float:
            raise TypeError('Note must be a float')
        if note < 2 or note > 6:
            raise ValueError('Note must be between 2 and 6 (inclusive)')
        self.name = name
        self.note = note

    def get_name(self):
        return self.name

    def get_note(self):
        return self.note


class NotesStorage:
    def add(self, note):
        pass

    def clear(self):
        pass

    def get_all_notes_of(self, name):
        pass



class NotesService:
    def __init__(self, notes_storage=None):
        self.notes_storage = notes_storage is None and NotesStorage() or notes_storage

    def add(self, note):
        return self.notes_storage.add(note)

    def average_of(self, name):
        all_notes = self.notes_storage.get_all_notes_of(name)
        if len(all_notes) == 0:
            raise ZeroDivisionError('No notes for this name')
        return sum(map(lambda note: note.get_note(), all_notes)) / len(all_notes)

    def clear(self):
        return self.notes_storage.clear()






class TestNotesService(unittest.TestCase):
    def test_average_of(self):
        notes_storage = NotesStorage()
        notes_storage.get_all_notes_of = Mock(
            name='get_all_notes_of',
            side_effect=(
                lambda name: name == 'Jack'
                and [Note('Jack', 5.0), Note('Jack', 3.0), Note('Jack', 5.5)]
            )
        )

        notes_service = NotesService(notes_storage)
        self.assertEqual(notes_service.average_of('Jack'), 4.5)

    def test_average_of_no_notes(self):
        notes_storage = NotesStorage()
        notes_storage.get_all_notes_of = Mock(name='get_all_notes_of')
        notes_storage.get_all_notes_of.return_value = []

        notes_service = NotesService(notes_storage)
        with self.assertRaisesRegex(ZeroDivisionError, '^No notes for this name$'):
            notes_service.average_of('John')

    def test_add(self):
        notes_storage = NotesStorage()
        notes_storage.add = Mock(
            name='add',
            side_effect=(lambda note: note)
        )

        notes_service = NotesService(notes_storage)
        self.assertIsInstance(notes_service.add(Note('George', 6.0)), Note)

    def test_add_wrong_type(self):
        def check_note(note):
            if not isinstance(note, Note):
                raise TypeError('Note must be a Note object')

        notes_storage = NotesStorage()
        notes_storage.add = Mock(
            name='add',
            side_effect=check_note
        )

        notes_service = NotesService(notes_storage)
        with self.assertRaisesRegex(TypeError, '^Note must be a Note object$'):
            notes_service.add(6.0)

    def test_clear(self):
        notes = [Note('Jack', 5.0), Note('George', 3.0), Note('Jack', 5.5)]

        notes_storage = NotesStorage()
        notes_storage.clear = Mock(name='clear')
        notes_storage.clear.return_value = notes

        notes_service = NotesService(notes_storage)
        self.assertListEqual(notes_service.clear(), notes)


if __name__ == '__main__':
    unittest.main()

