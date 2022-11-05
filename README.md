# Introduce Team

<center><img src="https://user-images.githubusercontent.com/61782746/199677768-cb7b52b1-1b99-417e-9fc1-16affe716bc0.png" width="300" height="300"></center>

> **_Life is on stage_** > **_댄스를 더 가볍게 모두가 스트릿 댄스를 즐길 수 있도록_**

## Product Description

제휴를 맺은 스튜디오들의 수강생들이 신청폼을 입력하여 수업을 수강하는 서비스입니다.

**서비스 이용 시 Bunt팀에서 기대하는 효과는**

1. 수강생들이 매번 변화하는 스튜디오 클래스 상황을 손쉽게 확인할 수 있습니다.
2. Class를 관리하는 관리자 앱을 통해 관리자는 등록한 수강생들의 결제, 출석 현황을 손쉽게 관리합니다.

## Develop

**Stack**

- Next

### Router

- / : 랜딩페이지를 보여줍니다.
- /form/studios : 제휴맺은 스튜디오 리스트를 보여준다.
- /form/studios/[id]/login : 수강생의 이름과 전화번호를 입력 받는 Form이 나옵니다.
- /form/studios/[id]/class : 수강생의 이름과 전화번호를 이용하여 firebase에 있는 값과 비교 후
  각 스튜디오의 클래스 신청 view가 나옵니다.
- /form/studios/[id]/coupon : 선택한 클래스에서 쿠폰을 사용할 지 구입할 지 결정하는 view 입니다.
- /form/studios/[id]/coupon/payment : 만약 쿠폰을 구매한다면 쿠폰에 대한 정보와 종류, 결제 방법에 대한 정보를 제공하는 view 입니다.
  이때 신청완료를 누르면 모든 정보들을 파이어베이스로 저장하는 역할을 합니다.

### Todo

#### Refactor Bunt-web

[MileStone](https://github.com/Team-BUNT/Bunt-web/milestone/2)

- [x] 프로젝트 구조 개편 및 Component 재구성 (https://github.com/Team-BUNT/Bunt-web/issues/8)

##### Domain

- [x] Firebase Api 호출 로직 개선 및 모델 분리 (https://github.com/Team-BUNT/Bunt-web/issues/9)
- [ ] Validation을 위한 모델 로직 분리 (https://github.com/Team-BUNT/Bunt-web/issues/10)

###### Firestore

- [x] Firestore 로직 분리
- [ ] 팩토리 패턴으로 리팩토링 하기

  - [x] FirestoreFetcher
  - [x] Collection
    - [x] Class
    - [x] Enrollment
    - [x] Student
    - [x] Studio

- [x] Collection의 studios에서 모든 정보 가져오기
- [x] 수강생이 이름 연락처 입력 시 Collection의 students에서 해당 수강생 정보 가져오기
- [x] 특정 studioID를 통해 현재 일로부터 일주일 후의 모든 Class 정보 가져오기
- [x] 해당 모든 정보들을 Enrollment, Student, Coupon에 저장하기

###### Model

- [ ] 시간을 UI에 맞게 Formatting
- [ ] 시간 순에 따라 데이터 정제하기
- [ ] 체크박스에 선택된 클래스만 선별한다.

#### Update form

[MileStone](https://github.com/Team-BUNT/Bunt-web/milestone/3)

- [ ] 페이지 별 데이터 저장을 위한 indexedDB 사용 (https://github.com/Team-BUNT/Bunt-web/issues/15)
- [ ] Landing page 제작을 위한 index 수정 (https://github.com/Team-BUNT/Bunt-web/issues/11)
- [ ] 각 Router에 해당하는 View 제작 (https://github.com/Team-BUNT/Bunt-web/issues/11)
- [ ] Form 제작을 위한 Router 설정 (https://github.com/Team-BUNT/Bunt-web/issues/12)
