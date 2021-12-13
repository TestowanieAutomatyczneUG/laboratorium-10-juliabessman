import unittest


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

class TestNote(unittest.TestCase):
    def test_get_name(self):
        name_to_check = 'test'
        note = Note(name_to_check, 4.6)
        self.assertEqual(note.get_name(), name_to_check)

    def test_get_note(self):
        note_to_check = 4.6
        note = Note('test', note_to_check)
        self.assertEqual(note.get_note(), note_to_check)

    def test_init_name_empty(self):
        with self.assertRaisesRegex(ValueError, '^Name must not be empty$'):
            Note('', 4.6)

    def test_init_name_wrong_type(self):
        with self.assertRaisesRegex(TypeError, '^Name must be a string$'):
            Note(None, 4.6)

    def test_init_note_wrong_type(self):
        with self.assertRaisesRegex(TypeError, '^Note must be a float$'):
            Note('test', 4)

    def test_init_note_less_2(self):
        with self.assertRaisesRegex(ValueError, '^Note must be between 2 and 6 \\(inclusive\\)$'):
            Note('test', 1.3)

    def test_init_note_more_6(self):
        with self.assertRaisesRegex(ValueError, '^Note must be between 2 and 6 \\(inclusive\\)$'):
            Note('test', 7.2)


if __name__ == '__main__':
    unittest.main()