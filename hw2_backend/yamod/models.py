from django.db import models


class Professor(models.Model):
    CHOICES = (
        ('w', 'Woman'),
        ('m', 'Man'),
        ('d', 'Divers'),
    )

    first_name = models.TextField()
    last_name = models.TextField()
    year_of_birth = models.IntegerField()
    gender = models.CharField(max_length=1, choices=CHOICES, null=True)
    ssn = models.PositiveIntegerField(null=True)

    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)


class University(models.Model):
    name = models.TextField()
    location = models.TextField()

    def __str__(self):
        return self.name


class Course(models.Model):
    CHOICES = (
        ('le', 'lecture'),
        ('ex', 'exercise'),
        ('xx', 'exam'),
    )

    name = models.TextField()
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    type = models.CharField(max_length=2, choices=CHOICES)
    professor = models.ManyToManyField('yamod.Professor', blank=True)

    def __str__(self):
        return self.name
