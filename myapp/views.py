from django.shortcuts import render, redirect,HttpResponse
from django.contrib.auth import get_user_model,authenticate,login as auth_login,logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .ml_models.disease_model.predictor import predict_disease
from .models import UserDocument
from django.urls import reverse

User=get_user_model()

def register(request):
    if request.method=="POST":
        fname=request.POST.get('firstname')
        lname=request.POST.get('lastname')
        email=request.POST.get('email')
        password=request.POST.get('password')
        confpass=request.POST.get('confirmpassword')
        
        if password != confpass:
            messages.error(request, "Passwords do not match.")
            return redirect('register')
        
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
            return redirect('register')

        my_user=User.objects.create_user(email=email,password=password,fname=fname,lname=lname)
        my_user.save()
        messages.success(request, "Account created successfully! Please log in.")
        return redirect('login')

        

    return render(request,'signup.html')

def login_view(request):
    if request.method=='POST':
        email=request.POST.get('email')
        password=request.POST.get('password')
        user=authenticate(request,email=email,password=password)
        if user is not None:
            auth_login(request,user)
            return redirect('home')
        else:
            messages.error(request,"Email or Password is wrong!")


    return render(request,'login.html')

@login_required
def model2part2_view(request):
    return render(request,'model2.html')


@login_required
def dashboard(request):
    if request.method == 'POST':
        uploaded_file = request.FILES.get('document')
        diagnosis = request.POST.get('diagnosis', '')
        if uploaded_file:
            UserDocument.objects.create(
                user=request.user,
                document=uploaded_file,
                diagnosis=diagnosis
            )
            return redirect('home')  # Replace with your dashboard URL name

    documents = UserDocument.objects.filter(user=request.user).order_by('-uploaded_at')
    # Get the diagnosis from the latest document, or empty string if none
    last_doc = documents.first()
    last_diagnosis = last_doc.diagnosis if last_doc and last_doc.diagnosis else ""
    return render(request, 'dashboard.html', {
        'documents': documents,
        'user': request.user,
        'last_diagnosis': last_diagnosis,  # Pass to template
    })



def LogoutPage(request):
    auth_logout(request)
    return redirect('/')

@login_required
def upload_profile_picture(request):
    if request.method == 'POST' and request.FILES.get('profile_picture'):
        request.user.profile_picture = request.FILES['profile_picture']
        request.user.save()
        url = reverse('home')
        return redirect(f"{url}?uploaded=1")
    return redirect('home')

@login_required
def disease_bot_view(request):
    symptoms_list =['abdominal_pain',
                    'abnormal_menstruation',
                    'acidity',
                    'acute_liver_failure',
                    'altered_sensorium',
                    'anxiety',
                    'back_pain',
                    'belly_pain',
                    'blackheads',
                    'bladder_discomfort',
                    'blister',
                    'blood_in_sputum',
                    'bloody_stool',
                    'blurred_and_distorted_vision',
                    'breathlessness',
                    'brittle_nails',
                    'bruising',
                    'burning_micturition',
                    'chest_pain',
                    'chills',
                    'cold_hands_and_feets',
                    'coma',
                    'congestion',
                    'constipation',
                    'continuous_feel_of_urine',
                    'continuous_sneezing',
                    'cough',
                    'cramps',
                    'dark_urine',
                    'dehydration',
                    'depression',
                    'diarrhoea',
                    'dischromic _patches',
                    'distention_of_abdomen',
                    'dizziness',
                    'drying_and_tingling_lips',
                    'enlarged_thyroid',
                    'excessive_hunger',
                    'extra_marital_contacts',
                    'family_history',
                    'fast_heart_rate',
                    'fatigue',
                    'fluid_overload',
                    'foul_smell_of urine',
                    'headache',
                    'high_fever',
                    'hip_joint_pain',
                    'history_of_alcohol_consumption',
                    'increased_appetite',
                    'indigestion',
                    'inflammatory_nails',
                    'internal_itching',
                    'irregular_sugar_level',
                    'irritability',
                    'irritation_in_anus',
                    'itching',
                    'joint_pain',
                    'knee_pain',
                    'lack_of_concentration',
                    'lethargy',
                    'loss_of_appetite',
                    'loss_of_balance',
                    'loss_of_smell',
                    'malaise',
                    'mild_fever',
                    'mood_swings',
                    'movement_stiffness',
                    'mucoid_sputum',
                    'muscle_pain',
                    'muscle_wasting',
                    'muscle_weakness',
                    'nausea',
                    'neck_pain',
                    'nodal_skin_eruptions',
                    'obesity',
                    'pain_behind_the_eyes',
                    'pain_during_bowel_movements',
                    'pain_in_anal_region',
                    'painful_walking',
                    'palpitations',
                    'passage_of_gases',
                    'patches_in_throat',
                    'phlegm',
                    'polyuria',
                    'prominent_veins_on_calf',
                    'puffy_face_and_eyes',
                    'pus_filled_pimples',
                    'receiving_blood_transfusion',
                    'receiving_unsterile_injections',
                    'red_sore_around_nose',
                    'red_spots_over_body',
                    'redness_of_eyes',
                    'restlessness',
                    'runny_nose',
                    'rusty_sputum',
                    'scurring',
                    'shivering',
                    'silver_like_dusting',
                    'sinus_pressure',
                    'skin_peeling',
                    'skin_rash',
                    'slurred_speech',
                    'small_dents_in_nails',
                    'spinning_movements',
                    'spotting_ urination',
                    'stiff_neck',
                    'stomach_bleeding',
                    'stomach_pain',
                    'sunken_eyes',
                    'sweating',
                    'swelled_lymph_nodes',
                    'swelling_joints',
                    'swelling_of_stomach',
                    'swollen_blood_vessels',
                    'swollen_extremeties',
                    'swollen_legs',
                    'throat_irritation',
                    'toxic_look_(typhos)',
                    'ulcers_on_tongue',
                    'unsteadiness',
                    'visual_disturbances',
                    'vomiting',
                    'watering_from_eyes',
                    'weakness_in_limbs',
                    'weakness_of_one_body_side',
                    'weight_gain',
                    'weight_loss',
                    'yellow_crust_ooze',
                    'yellow_urine',
                    'yellowing_of_eyes',
                    'yellowish_skin']
    if request.method == "POST":
        symptoms = request.POST.getlist('symptoms')
        if len(symptoms) < 3:
            return render(request, 'chatbot.html', {
                'error': 'Please select at least 3 symptoms',
                'symptoms_list': symptoms_list
            })
        disease, confidence = predict_disease(symptoms)
        user_doc = UserDocument.objects.filter(user=request.user).order_by('-uploaded_at').first()
        if user_doc:
            user_doc.diagnosis = disease
            user_doc.save(update_fields=['diagnosis'])
        else:
            UserDocument.objects.create(
                user=request.user,
                diagnosis=disease
            )

        
        return render(request, 'chatbot.html', {
            'disease': disease,
            'confidence': confidence,
            'symptoms_list': symptoms_list
        })
    return render(request, 'chatbot.html', {'symptoms_list': symptoms_list})



