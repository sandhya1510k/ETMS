from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class Trainer(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # hashed password

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def save(self, *args, **kwargs):
        # Agar password plain text hai to usko hash karo
        if self.password and not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email


class Trainee(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # hashed password

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def save(self, *args, **kwargs):
        # Agar password plain text hai to usko hash karo
        if self.password and not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email
