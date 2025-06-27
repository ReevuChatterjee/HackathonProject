from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, fname=None, lname=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        
        email=self.normalize_email(email)
        user=self.model(email=email, fname=fname, lname=lname, **extra_fields)
        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self,email,password=None,fname=None, lname=None,**extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        return self.create_user(email,password,fname,lname,**extra_fields)
    

class CustomUser(AbstractBaseUser, PermissionsMixin):
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100,null=True,blank=True)
    email = models.EmailField(primary_key=True)

    profile_picture = models.ImageField(upload_to='profile_pics/', default='default-profile.png', null=True, blank=True)


    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    REQUIRED_FIELDS=['fname','lname']
    USERNAME_FIELD='email'


    objects=CustomUserManager()

class UserDocument(models.Model):
    

    user = models.ForeignKey(
        CustomUser,
        to_field='email',   # Explicitly link to email field
        on_delete=models.CASCADE,
        related_name='documents'
    )
    diagnosis = models.TextField(null=True, blank=True,max_length=255)
    document = models.FileField(upload_to='user_documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True,null=True,blank=True)

    def __str__(self):
        return f"{self.user.email} - {self.diagnosis or 'No Diagnosis'}"
# Create your models here.
