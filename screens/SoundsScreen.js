import React, { useState, useEffect, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import audioManager from '../utils/audioManager';
import WakeToneDropdown from '../components/WakeToneDropdown.js';

// Back Arrow Icon
const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

// Musical Note Icon for Soft Chime
const SoftChimeIcon = () => (
  <Svg width={32} height={36} viewBox="0 0 32 36" fill="none">
    <G clipPath="url(#clip0_soft_chime)">
      <Path
        d="M6.75 23.625C6.75 19.6875 9.5625 16.875 13.5 16.875C17.4375 16.875 20.25 19.6875 20.25 23.625C20.25 27.5625 17.4375 30.375 13.5 30.375C9.5625 30.375 6.75 27.5625 6.75 23.625ZM18.375 23.625V4.5C18.375 3.94922 18.8242 3.5 19.375 3.5C19.9258 3.5 20.375 3.94922 20.375 4.5V5.17969C21.7734 4.85156 23.2422 4.92188 24.5703 5.42578C26.6484 6.23438 28.125 8.20312 28.125 10.4062C28.125 11.4844 27.2578 12.375 26.1562 12.375C25.3555 12.375 24.6797 11.9531 24.3516 11.2969C23.9648 10.5 23.2656 9.92578 22.4297 9.70312C21.8789 9.5625 21.2852 9.60938 20.7695 9.83203C20.5547 9.92578 20.375 10.0898 20.375 10.3125V23.625C20.375 24.1758 19.9258 24.625 19.375 24.625C18.8242 24.625 18.375 24.1758 18.375 23.625Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_soft_chime">
        <Path d="M0 0H32V36H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Bell Icon for Calm Bell
const BellIcon = () => (
  <Svg width={32} height={36} viewBox="0 0 33 36" fill="none">
    <G clipPath="url(#clip0_270_48)">
      <Path
        d="M16.5 0C15.2555 0 14.25 1.00547 14.25 2.25V3.50859C9.15236 4.31719 5.25001 8.73281 5.25001 14.0625V16.4109C5.25001 19.6031 4.16017 22.7039 2.17033 25.193L1.12267 26.5078C0.714858 27.0141 0.637515 27.7102 0.918765 28.2937C1.20001 28.8773 1.79064 29.25 2.43751 29.25H30.5625C31.2094 29.25 31.8 28.8773 32.0813 28.2937C32.3625 27.7102 32.2852 27.0141 31.8774 26.5078L30.8297 25.2C28.8399 22.7039 27.75 19.6031 27.75 16.4109V14.0625C27.75 8.73281 23.8477 4.31719 18.75 3.50859V2.25C18.75 1.00547 17.7445 0 16.5 0ZM16.5 6.75H17.0625C21.0985 6.75 24.375 10.0266 24.375 14.0625V16.4109C24.375 19.7789 25.3524 23.0625 27.1664 25.875H5.83361C7.64767 23.0625 8.62501 19.7789 8.62501 16.4109V14.0625C8.62501 10.0266 11.9016 6.75 15.9375 6.75H16.5ZM21 31.5H16.5H12C12 32.6953 12.4711 33.8414 13.3149 34.6852C14.1586 35.5289 15.3047 36 16.5 36C17.6953 36 18.8414 35.5289 19.6852 34.6852C20.5289 33.8414 21 32.6953 21 31.5Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_270_48">
        <Path d="M0.75 0H32.25V36H0.75V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Wind Icon for Gentle Breeze
const WindIcon = () => (
  <Svg width={36} height={36} viewBox="0 0 37 36" fill="none">
    <G clipPath="url(#clip0_270_58)">
      <Path
        d="M20.75 2.25C20.75 3.49453 21.7555 4.5 23 4.5H25.25C26.4945 4.5 27.5 5.50547 27.5 6.75C27.5 7.99453 26.4945 9 25.25 9H2.75C1.50547 9 0.5 10.0055 0.5 11.25C0.5 12.4945 1.50547 13.5 2.75 13.5H25.25C28.9766 13.5 32 10.4766 32 6.75C32 3.02344 28.9766 0 25.25 0H23C21.7555 0 20.75 1.00547 20.75 2.25ZM25.25 27C25.25 28.2445 26.2555 29.25 27.5 29.25H29.75C33.4766 29.25 36.5 26.2266 36.5 22.5C36.5 18.7734 33.4766 15.75 29.75 15.75H2.75C1.50547 15.75 0.5 16.7555 0.5 18C0.5 19.2445 1.50547 20.25 2.75 20.25H29.75C30.9945 20.25 32 21.2555 32 22.5C32 23.7445 30.9945 24.75 29.75 24.75H27.5C26.2555 24.75 25.25 25.7555 25.25 27ZM9.5 36H11.75C15.4766 36 18.5 32.9766 18.5 29.25C18.5 25.5234 15.4766 22.5 11.75 22.5H2.75C1.50547 22.5 0.5 23.5055 0.5 24.75C0.5 25.9945 1.50547 27 2.75 27H11.75C12.9945 27 14 28.0055 14 29.25C14 30.4945 12.9945 31.5 11.75 31.5H9.5C8.25547 31.5 7.25 32.5055 7.25 33.75C7.25 34.9945 8.25547 36 9.5 36Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_270_58">
        <Path d="M0.5 0H36.5V36H0.5V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Bird Icon for Morning Birds
const BirdIcon = () => (
  <Svg width={36} height={36} viewBox="0 0 37 36" fill="none">
    <G clipPath="url(#clip0_270_63)">
      <Path
        d="M11.8063 6.78516C12.7906 7.98047 13.986 8.95782 15.2867 9.75235C17.1078 10.8633 19.0625 11.5734 20.75 11.9742V9.75938C19.1891 7.62891 18.0781 5.02735 17.9797 1.96875C17.9516 1.17422 17.4524 0.457034 16.686 0.253128C16.1516 0.112503 15.575 0.239065 15.2094 0.66094C14.2742 1.74375 12.9102 3.79688 11.8063 6.79219V6.78516ZM23 10.125V12.2766V12.368V14.625C18.725 14.2664 9.99221 11.5453 7.58049 3.57188C7.34846 2.8125 6.68049 2.25 5.88596 2.25C5.33049 2.25 4.81017 2.52422 4.56408 3.02344C3.79064 4.6336 2.75002 7.88203 2.75002 12.375C2.75002 20.5945 8.38205 25.0664 11.075 26.6344L1.32971 29.2922C0.971113 29.3906 0.682831 29.6578 0.5633 30.0094C0.443769 30.3609 0.50705 30.7547 0.725019 31.05C2.0258 32.7797 5.93517 36 11.75 36C12.0031 36 12.2563 35.9156 12.4531 35.7539L17.7688 31.5H23C29.2156 31.5 34.25 26.4656 34.25 20.25V9L36.3524 5.84297C36.4438 5.70235 36.5 5.5336 36.5 5.36485C36.5 4.88672 36.1133 4.5 35.6352 4.5H28.625C25.5172 4.5 23 7.01719 23 10.125ZM28.625 9C28.9234 9 29.2095 9.11853 29.4205 9.32951C29.6315 9.54049 29.75 9.82663 29.75 10.125C29.75 10.4234 29.6315 10.7095 29.4205 10.9205C29.2095 11.1315 28.9234 11.25 28.625 11.25C28.3267 11.25 28.0405 11.1315 27.8295 10.9205C27.6185 10.7095 27.5 10.4234 27.5 10.125C27.5 9.82663 27.6185 9.54049 27.8295 9.32951C28.0405 9.11853 28.3267 9 28.625 9Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_270_63">
        <Path d="M0.5 0H36.5V36H0.5V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Wave Icon for Ocean Surf
const WaveIcon = () => (
  <Svg width={40} height={36} viewBox="0 0 41 36" fill="none">
    <G clipPath="url(#clip0_270_68)">
      <Path
        d="M19.1992 4.91488C19.9797 4.35941 21.0203 4.35941 21.8008 4.91488C23.3828 6.00472 25.3164 6.75003 27.25 6.75003C29.1414 6.75003 31.1453 5.99066 32.6922 4.91488C33.5289 4.31722 34.668 4.36644 35.4484 5.03441C36.4609 5.87113 37.7336 6.51097 39.0062 6.80628C40.2156 7.08753 40.968 8.29691 40.6867 9.50628C40.4055 10.7157 39.1961 11.468 37.9867 11.1868C36.2641 10.786 34.8297 10.0266 33.8945 9.42894C31.8555 10.5258 29.5703 11.25 27.25 11.25C25.007 11.25 22.9891 10.5539 21.5969 9.92113C21.1891 9.73128 20.8164 9.54847 20.5 9.37972C20.1836 9.54847 19.818 9.73831 19.4031 9.92113C18.0109 10.5539 15.993 11.25 13.75 11.25C11.4297 11.25 9.14452 10.5258 7.10546 9.43597C6.16327 10.0266 4.73593 10.793 3.01327 11.1938C1.8039 11.475 0.594523 10.7227 0.313273 9.51331C0.0320231 8.30394 0.784367 7.09456 1.99374 6.81331C3.25937 6.51097 4.53905 5.87113 5.54452 5.03441C6.32499 4.36644 7.46405 4.32425 8.30077 4.91488C9.86171 5.99066 11.8586 6.75003 13.75 6.75003C15.6836 6.75003 17.6172 6.00472 19.1992 4.91488ZM21.8008 25.1649C23.3828 26.2547 25.3164 27 27.25 27C29.1414 27 31.1453 26.2407 32.6922 25.1649C33.5289 24.5672 34.668 24.6164 35.4484 25.2844C36.4609 26.1211 37.7336 26.761 39.0062 27.0563C40.2156 27.3375 40.968 28.5469 40.6867 29.7563C40.4055 30.9657 39.1961 31.718 37.9867 31.4368C36.2641 31.036 34.8297 30.2766 33.8945 29.6789C31.8555 30.7758 29.5703 31.5 27.25 31.5C25.007 31.5 22.9891 30.8039 21.5969 30.1711C21.1891 29.9813 20.8164 29.7985 20.5 29.6297C20.1836 29.7985 19.818 29.9883 19.4031 30.1711C18.0109 30.8039 15.993 31.5 13.75 31.5C11.4297 31.5 9.14452 30.7758 7.10546 29.686C6.16327 30.2766 4.73593 31.043 3.01327 31.4438C1.8039 31.725 0.594523 30.9727 0.313273 29.7633C0.0320231 28.5539 0.784367 27.3446 1.99374 27.0633C3.2664 26.768 4.53905 26.1282 5.55155 25.2914C6.33202 24.6305 7.47109 24.5813 8.3078 25.1719C9.86171 26.2407 11.8586 27 13.75 27C15.6836 27 17.6172 26.2547 19.1992 25.1649C19.9797 24.6094 21.0203 24.6094 21.8008 25.1649ZM21.8008 15.0399C23.3828 16.1297 25.3164 16.875 27.25 16.875C29.1414 16.875 31.1453 16.1157 32.6922 15.0399C33.5289 14.4422 34.668 14.4914 35.4484 15.1594C36.4609 15.9961 37.7336 16.636 39.0062 16.9313C40.2156 17.2125 40.968 18.4219 40.6867 19.6313C40.4055 20.8407 39.1961 21.593 37.9867 21.3118C36.2641 20.911 34.8297 20.1516 33.8945 19.5539C31.8555 20.6508 29.5703 21.375 27.25 21.375C25.007 21.375 22.9891 20.6789 21.5969 20.0461C21.1891 19.8563 20.8164 19.6735 20.5 19.5047C20.1836 19.6735 19.818 19.8633 19.4031 20.0461C18.0109 20.6789 15.993 21.375 13.75 21.375C11.4297 21.375 9.14452 20.6508 7.10546 19.561C6.16327 20.1516 4.73593 20.918 3.01327 21.3188C1.8039 21.6 0.594523 20.8477 0.313273 19.6383C0.0320231 18.4289 0.784367 17.2196 1.99374 16.9383C3.2664 16.643 4.53905 16.0032 5.55155 15.1664C6.33202 14.4985 7.47109 14.4563 8.3078 15.0469C9.86171 16.1157 11.8586 16.875 13.75 16.875C15.6836 16.875 17.6172 16.1297 19.1992 15.0399C19.9797 14.4844 21.0203 14.4844 21.8008 15.0399Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_270_68">
        <Path d="M0.25 0H40.75V36H0.25V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Leaf Icon for Forest Sounds
const LeafIcon = () => (
  <Svg width={36} height={36} viewBox="0 0 37 36" fill="none">
    <G clipPath="url(#clip0_270_73)">
      <Path
        d="M19.625 6.75004C14.0984 6.75004 9.42266 10.3711 7.83359 15.3633C10.1961 14.168 12.8609 13.5 15.6875 13.5H21.875C22.4937 13.5 23 14.0063 23 14.625C23 15.2438 22.4937 15.75 21.875 15.75H20.75H15.6875C14.5203 15.75 13.3883 15.8836 12.2984 16.1297C10.4773 16.5446 8.78281 17.2829 7.27813 18.2883C3.19297 21.0094 0.5 25.6571 0.5 30.9375V32.0625C0.5 32.9977 1.25234 33.75 2.1875 33.75C3.12266 33.75 3.875 32.9977 3.875 32.0625V30.9375C3.875 27.5133 5.33047 24.4336 7.65781 22.275C9.05 27.5836 13.8805 31.5 19.625 31.5H19.6953C28.9836 31.4508 36.5 22.2961 36.5 11.011C36.5 8.01567 35.9727 5.16801 35.0164 2.60161C34.8336 2.11645 34.1234 2.13754 33.8773 2.59458C32.5555 5.06958 29.9398 6.75004 26.9375 6.75004H19.625Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_270_73">
        <Path d="M0.5 0H36.5V36H0.5V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Play Icon for play buttons
const PlayIcon = () => (
  <Svg width={9} height={12} viewBox="0 0 9 12" fill="none">
    <G clipPath="url(#clip0_270_105)">
      <Path
        d="M1.71094 0.914071C1.36406 0.70079 0.928125 0.693759 0.574219 0.892978C0.220312 1.0922 0 1.4672 0 1.87501V10.125C0 10.5328 0.220312 10.9078 0.574219 11.107C0.928125 11.3063 1.36406 11.2969 1.71094 11.0859L8.46094 6.96095C8.79609 6.75704 9 6.39376 9 6.00001C9 5.60626 8.79609 5.24532 8.46094 5.03907L1.71094 0.914071Z"
        fill="#FDFDFD"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_270_105">
        <Path d="M0 0H9V12H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Chevron Right Icon for sound cards
const ChevronRightIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 6L15 12L9 18"
      stroke="#1E2A38"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Ambient Sound Icons
// Rain Icon for Rainfall
const RainIcon = () => (
  <Svg width={36} height={36} viewBox="0 0 37 36" fill="none">
    <G clipPath="url(#clip0_275_78)">
      <Path
        d="M7.25 22.5C3.52344 22.5 0.5 19.4766 0.5 15.75C0.5 12.7617 2.44063 10.2234 5.13359 9.3375C5.04922 8.86641 5 8.37422 5 7.875C5 3.52266 8.52266 0 12.875 0C15.9055 0 18.5352 1.70859 19.85 4.21875C20.8836 3.01641 22.4164 2.25 24.125 2.25C27.2328 2.25 29.75 4.76719 29.75 7.875C29.75 8.26172 29.7078 8.63437 29.6375 9C29.6727 9 29.7148 9 29.75 9C33.4766 9 36.5 12.0234 36.5 15.75C36.5 19.4766 33.4766 22.5 29.75 22.5H7.25ZM6.77187 26.1562C6.86328 25.9805 7.04609 25.875 7.25 25.875C7.45391 25.875 7.62969 25.9805 7.72813 26.1562L10.1961 30.6984C10.4844 31.2258 10.632 31.8094 10.632 32.407V32.618C10.632 34.4813 9.12031 35.993 7.25703 35.993C5.39375 35.993 3.88203 34.4813 3.88203 32.618V32.407C3.88203 31.8094 4.02969 31.2188 4.31797 30.6984L6.77187 26.1562ZM18.0219 26.1562C18.1133 25.9805 18.2961 25.875 18.5 25.875C18.7039 25.875 18.8797 25.9805 18.9781 26.1562L21.4461 30.6984C21.7344 31.2258 21.882 31.8094 21.882 32.407V32.618C21.882 34.4813 20.3703 35.993 18.507 35.993C16.6438 35.993 15.132 34.4813 15.132 32.618V32.407C15.132 31.8094 15.2797 31.2188 15.568 30.6984L18.0219 26.1562ZM26.8039 30.6984L29.2719 26.1562C29.3633 25.9805 29.5461 25.875 29.75 25.875C29.9539 25.875 30.1297 25.9805 30.2281 26.1562L32.6961 30.6984C32.9844 31.2258 33.132 31.8094 33.132 32.407V32.618C33.132 34.4813 31.6203 35.993 29.757 35.993C27.8938 35.993 26.382 34.4813 26.382 32.618V32.407C26.382 31.8094 26.5297 31.2188 26.818 30.6984H26.8039Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_275_78">
        <Path d="M0.5 0H36.5V36H0.5V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Forest Icon for Campfire
const ForestIcon = () => (
  <Svg width={32} height={36} viewBox="0 0 33 36" fill="none">
    <G clipPath="url(#clip0_275_83)">
      <Path
        d="M15.5578 0.414844L5.10938 11.9109C4.83516 12.2062 4.6875 12.6 4.6875 13.0008C4.6875 13.9008 5.41172 14.625 6.31172 14.625H8.0625L2.90156 19.7859C2.60625 20.0812 2.4375 20.4891 2.4375 20.9109C2.4375 21.7898 3.14766 22.5 4.02656 22.5H6.375L1.12969 28.793C0.883594 29.0883 0.75 29.4609 0.75 29.8477C0.75 30.7617 1.48828 31.5 2.40234 31.5H14.25V33.75C14.25 34.9945 15.2555 36 16.5 36C17.7445 36 18.75 34.9945 18.75 33.75V31.5H30.5977C31.5117 31.5 32.25 30.7617 32.25 29.8477C32.25 29.4609 32.1164 29.0883 31.8703 28.793L26.625 22.5H28.9734C29.8523 22.5 30.5625 21.7898 30.5625 20.9109C30.5625 20.4891 30.3937 20.0812 30.0984 19.7859L24.9375 14.625H26.6883C27.5812 14.625 28.3125 13.9008 28.3125 13.0008C28.3125 12.6 28.1648 12.2062 27.8906 11.9109L17.4422 0.414844C17.2031 0.147656 16.8586 0 16.5 0C16.1414 0 15.7969 0.147656 15.5578 0.414844Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_275_83">
        <Path d="M0.75 0H32.25V36H0.75V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Fire Icon for Campfire
const FireIcon = () => (
  <Svg width={32} height={36} viewBox="0 0 33 36" fill="none">
    <G clipPath="url(#clip0_275_88)">
      <Path
        d="M11.9508 0.379632C12.4992 -0.133649 13.35 -0.126618 13.8984 0.386664C15.8391 2.20776 17.6602 4.16948 19.3617 6.29291C20.1352 5.28041 21.0141 4.17651 21.9633 3.27651C22.5188 2.75619 23.3766 2.75619 23.932 3.28354C26.3648 5.60385 28.425 8.66948 29.8734 11.5804C31.3008 14.4492 32.25 17.3812 32.25 19.4484C32.25 28.4203 25.2328 35.9999 16.5 35.9999C7.66875 35.9999 0.75 28.4132 0.75 19.4414C0.75 16.7414 2.00156 13.4437 3.94219 10.1812C5.90391 6.86948 8.67422 3.41713 11.9508 0.379632ZM16.6195 29.2499C18.3984 29.2499 19.9734 28.7578 21.457 27.7734C24.4172 25.7062 25.2117 21.5718 23.4328 18.3234C23.1164 17.6906 22.3078 17.6484 21.8508 18.1828L20.0789 20.2429C19.6148 20.7773 18.7781 20.7632 18.3422 20.2078C17.182 18.7312 15.1078 16.0945 13.9266 14.5968C13.4836 14.0343 12.6398 14.0273 12.1898 14.5898C9.81328 17.5781 8.61797 19.4624 8.61797 21.5789C8.625 26.3953 12.1828 29.2499 16.6195 29.2499Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_275_88">
        <Path d="M0.75 0H32.25V36H0.75V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Ocean Waves Icon
const OceanWavesIcon = () => (
  <Svg width={41} height={36} viewBox="0 0 41 36" fill="none">
    <G clipPath="url(#clip0_275_93)">
      <Path
        d="M19.1993 4.91488C19.9797 4.35941 21.0204 4.35941 21.8008 4.91488C23.3829 6.00472 25.3165 6.75003 27.2501 6.75003C29.1415 6.75003 31.1454 5.99066 32.6922 4.91488C33.529 4.31722 34.668 4.36644 35.4485 5.03441C36.461 5.87113 37.7336 6.51097 39.0063 6.80628C40.2157 7.08753 40.968 8.29691 40.6868 9.50628C40.4055 10.7157 39.1961 11.468 37.9868 11.1868C36.2641 10.786 34.8297 10.0266 33.8946 9.42894C31.8555 10.5258 29.5704 11.25 27.2501 11.25C25.0071 11.25 22.9891 10.5539 21.5969 9.92113C21.1891 9.73128 20.8165 9.54847 20.5001 9.37972C20.1836 9.54847 19.818 9.73831 19.4032 9.92113C18.011 10.5539 15.993 11.25 13.7501 11.25C11.4297 11.25 9.14458 10.5258 7.10552 9.43597C6.16333 10.0266 4.73599 10.793 3.01333 11.1938C1.80396 11.475 0.594584 10.7227 0.313334 9.51331C0.0320841 8.30394 0.784428 7.09456 1.9938 6.81331C3.25943 6.51097 4.53912 5.87113 5.54458 5.03441C6.32505 4.36644 7.46412 4.32425 8.30083 4.91488C9.86177 5.99066 11.8586 6.75003 13.7501 6.75003C15.6836 6.75003 17.6172 6.00472 19.1993 4.91488ZM21.8008 25.1649C23.3829 26.2547 25.3165 27 27.2501 27C29.1415 27 31.1454 26.2407 32.6922 25.1649C33.529 24.5672 34.668 24.6164 35.4485 25.2844C36.461 26.1211 37.7336 26.761 39.0063 27.0563C40.2157 27.3375 40.968 28.5469 40.6868 29.7563C40.4055 30.9657 39.1961 31.718 37.9868 31.4368C36.2641 31.036 34.8297 30.2766 33.8946 29.6789C31.8555 30.7758 29.5704 31.5 27.2501 31.5C25.0071 31.5 22.9891 30.8039 21.5969 30.1711C21.1891 29.9813 20.8165 29.7985 20.5001 29.6297C20.1836 29.7985 19.818 29.9883 19.4032 30.1711C18.011 30.8039 15.993 31.5 13.7501 31.5C11.4297 31.5 9.14458 30.7758 7.10552 29.686C6.16333 30.2766 4.73599 31.043 3.01333 31.4438C1.80396 31.725 0.594584 30.9727 0.313334 29.7633C0.0320841 28.5539 0.784428 27.3446 1.9938 27.0633C3.26646 26.768 4.53912 26.1282 5.55162 25.2914C6.33208 24.6305 7.47115 24.5813 8.30787 25.1719C9.86177 26.2407 11.8586 27 13.7501 27C15.6836 27 17.6172 26.2547 19.1993 25.1649C19.9797 24.6094 21.0204 24.6094 21.8008 25.1649ZM21.8008 15.0399C23.3829 16.1297 25.3165 16.875 27.2501 16.875C29.1415 16.875 31.1454 16.1157 32.6922 15.0399C33.529 14.4422 34.668 14.4914 35.4485 15.1594C36.461 15.9961 37.7336 16.636 39.0063 16.9313C40.2157 17.2125 40.968 18.4219 40.6868 19.6313C40.4055 20.8407 39.1961 21.593 37.9868 21.3118C36.2641 20.911 34.8297 20.1516 33.8946 19.5539C31.8555 20.6508 29.5704 21.375 27.2501 21.375C25.0071 21.375 22.9891 20.6789 21.5969 20.0461C21.1891 19.8563 20.8165 19.6735 20.5001 19.5047C20.1836 19.6735 19.818 19.8633 19.4032 20.0461C18.011 20.6789 15.993 21.375 13.7501 21.375C11.4297 21.375 9.14458 20.6508 7.10552 19.561C6.16333 20.1516 4.73599 20.918 3.01333 21.3188C1.80396 21.6 0.594584 20.8477 0.313334 19.6383C0.0320841 18.4289 0.784428 17.2196 1.9938 16.9383C3.26646 16.643 4.53912 16.0032 5.55162 15.1664C6.33208 14.4985 7.47115 14.4563 8.30787 15.0469C9.86177 16.1157 11.8586 16.875 13.7501 16.875C15.6836 16.875 17.6172 16.1297 19.1993 15.0399C19.9797 14.4844 21.0204 14.4844 21.8008 15.0399Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_275_93">
        <Path d="M0.25 0H40.75V36H0.25V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Moon Icon for Night Crickets
const MoonIcon = () => (
  <Svg width={27} height={36} viewBox="0 0 27 36" fill="none">
    <G clipPath="url(#clip0_275_98)">
      <Path
        d="M15.7148 2.25C7.03125 2.25 0 9.30234 0 18C0 26.6977 7.03125 33.75 15.7148 33.75C19.9758 33.75 23.8359 32.0484 26.6695 29.2922C27.0211 28.9477 27.1125 28.4133 26.8875 27.9773C26.6625 27.5414 26.1773 27.2953 25.6922 27.3797C25.0031 27.4992 24.3 27.5625 23.5758 27.5625C16.7625 27.5625 11.2359 22.0219 11.2359 15.1875C11.2359 10.5609 13.7672 6.53203 17.5148 4.40859C17.9438 4.1625 18.1617 3.67031 18.0562 3.19219C17.9508 2.71406 17.543 2.35547 17.0508 2.31328C16.6078 2.27813 16.1648 2.25703 15.7148 2.25703V2.25Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_275_98">
        <Path d="M0 0H27V36H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// White Noise Icon (Speaker)
const WhiteNoiseIcon = () => (
  <Svg width={45} height={36} viewBox="0 0 45 36" fill="none">
    <Path
      d="M37.5187 2.28511C42.082 5.99761 45 11.6578 45 18C45 24.3421 42.082 30.0093 37.5187 33.7148C36.7945 34.3054 35.7328 34.1929 35.1422 33.4687C34.5516 32.7445 34.6641 31.6828 35.3883 31.0921C39.1992 27.9984 41.625 23.2875 41.625 18C41.625 12.7125 39.1992 8.00151 35.3883 4.90073C34.6641 4.31011 34.5586 3.24839 35.1422 2.52417C35.7258 1.79995 36.7945 1.69448 37.5187 2.27808V2.28511ZM33.2648 7.52339C36.3023 9.99839 38.25 13.7742 38.25 18C38.25 22.2257 36.3023 26.0015 33.2648 28.4765C32.5406 29.0671 31.4789 28.9546 30.8883 28.2304C30.2977 27.5062 30.4102 26.4445 31.1344 25.8539C33.4195 23.9976 34.875 21.171 34.875 18C34.875 14.8289 33.4195 12.0023 31.1344 10.139C30.4102 9.54839 30.3047 8.48667 30.8883 7.76245C31.4719 7.03823 32.5406 6.93276 33.2648 7.51636V7.52339ZM29.0109 12.7617C30.5227 13.9992 31.5 15.8835 31.5 18C31.5 20.1164 30.5227 22.0007 29.0109 23.2382C28.2867 23.8289 27.225 23.7164 26.6344 22.9921C26.0437 22.2679 26.1562 21.2062 26.8805 20.6156C27.6398 19.9968 28.125 19.0546 28.125 18C28.125 16.9453 27.6398 16.0031 26.8805 15.3773C26.1562 14.7867 26.0508 13.725 26.6344 13.0007C27.218 12.2765 28.2867 12.171 29.0109 12.7546V12.7617ZM21.1711 2.44683C21.9797 2.81245 22.5 3.61401 22.5 4.49995V31.5C22.5 32.3859 21.9797 33.1875 21.1711 33.5531C20.3625 33.9187 19.4133 33.771 18.7523 33.1804L9.26719 24.75H4.5C2.01797 24.75 0 22.732 0 20.25V15.75C0 13.2679 2.01797 11.25 4.5 11.25H9.26719L18.7523 2.81948C19.4133 2.22886 20.3625 2.08823 21.1711 2.44683Z"
      fill="#1E2A38"
    />
  </Svg>
);

// Home icon for bottom navigation
const HomeIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 2.5L2.5 8.75V17.5C2.5 17.8315 2.6317 18.1495 2.86612 18.3839C3.10054 18.6183 3.41848 18.75 3.75 18.75H7.5V13.75C7.5 13.4185 7.6317 13.1005 7.86612 12.8661C8.10054 12.6317 8.41848 12.5 8.75 12.5H11.25C11.5815 12.5 11.8995 12.6317 12.1339 12.8661C12.3683 13.1005 12.5 13.4185 12.5 13.75V18.75H16.25C16.5815 18.75 16.8995 18.6183 17.1339 18.3839C17.3683 18.1495 17.5 17.8315 17.5 17.5V8.75L10 2.5Z"
      fill="#FDFDFD"
      fillOpacity="0.6"
    />
  </Svg>
);

// Clock icon for History tab
const ClockIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <G clipPath="url(#clip0_270_139)">
      <Path
        d="M18.125 10C18.125 12.1549 17.269 14.2215 15.7452 15.7452C14.2215 17.269 12.1549 18.125 10 18.125C7.84512 18.125 5.77849 17.269 4.25476 15.7452C2.73102 14.2215 1.875 12.1549 1.875 10C1.875 7.84512 2.73102 5.77849 4.25476 4.25476C5.77849 2.73102 7.84512 1.875 10 1.875C12.1549 1.875 14.2215 2.73102 15.7452 4.25476C17.269 5.77849 18.125 7.84512 18.125 10ZM0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10ZM9.0625 4.6875V10C9.0625 10.3125 9.21875 10.6055 9.48047 10.7812L13.2305 13.2812C13.6602 13.5703 14.2422 13.4531 14.5312 13.0195C14.8203 12.5859 14.7031 12.0078 14.2695 11.7188L10.9375 9.5V4.6875C10.9375 4.16797 10.5195 3.75 10 3.75C9.48047 3.75 9.0625 4.16797 9.0625 4.6875Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_270_139">
        <Path d="M0 0H20V20H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Profile icon for Profile tab
const ProfileIcon = () => (
  <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
    <G clipPath="url(#clip0_270_147)">
      <Path
        d="M12.0938 5C12.0938 4.1712 11.7645 3.37634 11.1785 2.79029C10.5924 2.20424 9.79755 1.875 8.96875 1.875C8.13995 1.875 7.34509 2.20424 6.75904 2.79029C6.17299 3.37634 5.84375 4.1712 5.84375 5C5.84375 5.8288 6.17299 6.62366 6.75904 7.20971C7.34509 7.79576 8.13995 8.125 8.96875 8.125C9.79755 8.125 10.5924 7.79576 11.1785 7.20971C11.7645 6.62366 12.0938 5.8288 12.0938 5ZM3.96875 5C3.96875 3.67392 4.49553 2.40215 5.43322 1.46447C6.3709 0.526784 7.64267 0 8.96875 0C10.2948 0 11.5666 0.526784 12.5043 1.46447C13.442 2.40215 13.9688 3.67392 13.9688 5C13.9688 6.32608 13.442 7.59785 12.5043 8.53553C11.5666 9.47322 10.2948 10 8.96875 10C7.64267 10 6.3709 9.47322 5.43322 8.53553C4.49553 7.59785 3.96875 6.32608 3.96875 5ZM2.14453 18.125H15.793C15.4453 15.6523 13.3203 13.75 10.7539 13.75H7.18359C4.61719 13.75 2.49219 15.6523 2.14453 18.125ZM0.21875 18.8398C0.21875 14.9922 3.33594 11.875 7.18359 11.875H10.7539C14.6016 11.875 17.7188 14.9922 17.7188 18.8398C17.7188 19.4805 17.1992 20 16.5586 20H1.37891C0.738281 20 0.21875 19.4805 0.21875 18.8398Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_270_147">
        <Path d="M0.21875 0H17.7188V20H0.21875V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

export default function SoundsScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('Wake Tones');
  const [currentWakeTone, setCurrentWakeTone] = useState('Soft Chime');
  const [currentAmbientSound, setCurrentAmbientSound] = useState('Rain');
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [currentPlayingSound, setCurrentPlayingSound] = useState(null);
  const [playbackTimeout, setPlaybackTimeout] = useState(null);
  const [startTime, setStartTime] = useState(null);

  // Load saved wake tone when component mounts
  useEffect(() => {
    loadSavedWakeTone();
    loadSavedAmbientSound();
    initializeAudio();
    
    // Cleanup on unmount
    return async () => {
      // Stop any playing audio
      if (isPlaying) {
        await audioManager.stopSound();
      }
      // Clear any timeouts
      if (playbackTimeout) {
        clearTimeout(playbackTimeout);
      }
      // Cleanup audio manager
      audioManager.cleanup();
    };
  }, []);
  
  const initializeAudio = async () => {
    try {
      await audioManager.initialize();
      console.log('Audio manager initialized - 15-second playback mode enabled');
    } catch (error) {
      console.error('Failed to initialize audio manager:', error);
    }
  };

  const loadSavedWakeTone = async () => {
    try {
      const savedWakeTone = await AsyncStorage.getItem('selectedWakeTone');
      if (savedWakeTone) {
        setCurrentWakeTone(savedWakeTone);
      }
    } catch (error) {
      console.log('Error loading saved wake tone:', error);
    }
  };

  const loadSavedAmbientSound = async () => {
    try {
      const savedAmbientSound = await AsyncStorage.getItem('selectedAmbientSound');
      if (savedAmbientSound) {
        setCurrentAmbientSound(savedAmbientSound);
      }
    } catch (error) {
      console.log('Error loading saved ambient sound:', error);
    }
  };

  const saveWakeTone = async (wakeTone) => {
    try {
      await AsyncStorage.setItem('selectedWakeTone', wakeTone);
      console.log('Wake tone saved successfully:', wakeTone);
    } catch (error) {
      console.log('Error saving wake tone:', error);
      Alert.alert('Error', 'Failed to save wake tone. Please try again.');
    }
  };

  const saveAmbientSound = async (ambientSound) => {
    try {
      await AsyncStorage.setItem('selectedAmbientSound', ambientSound);
      console.log('Ambient sound saved successfully:', ambientSound);
    } catch (error) {
      console.log('Error saving ambient sound:', error);
      Alert.alert('Error', 'Failed to save ambient sound. Please try again.');
    }
  };

  const handleBackPress = async () => {
    // Stop any playing audio when navigating away
    if (isPlaying) {
      await audioManager.stopSound();
      setIsPlaying(false);
      setPlaybackProgress(0);
      setCurrentPlayingSound(null);
      if (playbackTimeout) {
        clearTimeout(playbackTimeout);
        setPlaybackTimeout(null);
      }
    }
    
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleTabPress = async (tab) => {
    // Stop any playing audio when switching tabs
    if (isPlaying) {
      await audioManager.stopSound();
      setIsPlaying(false);
      setPlaybackProgress(0);
      setCurrentPlayingSound(null);
      if (playbackTimeout) {
        clearTimeout(playbackTimeout);
        setPlaybackTimeout(null);
      }
    }
    
    setSelectedTab(tab);
    setOpenDropdown(null); // Close any open dropdown when switching tabs
  };

  const handleSoundPress = async (soundName) => {
    console.log(`${soundName} pressed`);
    
    // Stop any currently playing audio when selecting a different sound
    if (isPlaying && currentPlayingSound !== soundName) {
      await audioManager.stopSound();
      setIsPlaying(false);
      setPlaybackProgress(0);
      setCurrentPlayingSound(null);
      if (playbackTimeout) {
        clearTimeout(playbackTimeout);
        setPlaybackTimeout(null);
      }
    }
    
    // Open the dropdown for both wake tones and ambient sounds
    setOpenDropdown(soundName);
  };

  const handleDropdownPlay = async (soundName) => {
    console.log(`Playing ${soundName}`);
    
    try {
      // Find the sound data
      const soundData = currentSoundCards.find(s => s.name === soundName);
      if (!soundData) {
        console.error('Sound data not found for:', soundName);
        return;
      }
      
      // Check if audio file exists
      if (!soundData.audioPath) {
        Alert.alert(
          'Audio Not Available',
          `Audio file for "${soundName}" hasn't been added yet. Add the audio file and update the audioPath to enable playback.`,
          [{ text: 'OK' }]
        );
        return;
      }
      
      if (isPlaying && currentPlayingSound === soundName) {
        // Stop if currently playing this sound
        console.log(`🛑 Stopping ${soundName} (currently playing)`);
        await audioManager.stopSound();
        setIsPlaying(false);
        setPlaybackProgress(0);
        setCurrentPlayingSound(null);
        if (playbackTimeout) {
          clearTimeout(playbackTimeout);
          setPlaybackTimeout(null);
        }
        console.log(`✅ ${soundName} stopped successfully`);
        return; // Exit early after stopping
      } else if (!isPlaying && currentPlayingSound === soundName && audioManager.currentSound) {
        // Resume if paused (only if audioManager actually has a sound loaded)
        await audioManager.resumeSound();
        setIsPlaying(true);
      } else {
        // Play new sound with time-based progress tracking
        const audioStartTime = Date.now();
        setStartTime(audioStartTime);
        
        // For wake tones: loop to fill 15 seconds; for ambient sounds: infinite looping
        const shouldLoop = true; // Both types now loop
        const isAmbientSound = selectedTab === 'Ambient Sounds';
        console.log(`Playing ${soundName}, selectedTab: ${selectedTab}, isAmbient: ${isAmbientSound}, shouldLoop: ${shouldLoop}`);
        
        console.log(`🎵 Starting to play ${soundName}`, {
          audioPath: soundData.audioPath?.toString?.() || 'undefined',
          isAmbient: isAmbientSound,
          shouldLoop
        });
        
        await audioManager.playSound(
          soundData.audioPath,
          (progressData) => {
            if (isAmbientSound) {
              // For ambient sounds, just track playing state (no progress bar)
              setPlaybackProgress(1); // Keep at 1 but won't be displayed
            } else {
              // For wake tones, calculate progress based on elapsed time
              const elapsedTime = Date.now() - audioStartTime;
              const fifteenSecondProgress = Math.min(elapsedTime / 15000, 1);
              
              console.log(`Time progress: ${Math.round(fifteenSecondProgress * 100)}% (${Math.round(elapsedTime/1000)}s)`);
              setPlaybackProgress(fifteenSecondProgress);
            }
            setIsPlaying(progressData.isPlaying);
          },
          (status) => {
            console.log(`📊 ${soundName} status update:`, {
              didJustFinish: status.didJustFinish,
              isLooping: status.isLooping,
              isLoaded: status.isLoaded,
              error: status.error
            });
            
            // Status callback - only handle non-looping wake tones finishing early
            if (status.didJustFinish && !isAmbientSound && !shouldLoop) {
              console.log('Audio finished naturally (non-looping wake tone), resetting state');
              setIsPlaying(false);
              setPlaybackProgress(0);
              setCurrentPlayingSound(null);
              // Clear the timeout since audio finished early
              if (playbackTimeout) {
                clearTimeout(playbackTimeout);
                setPlaybackTimeout(null);
              }
            }
            
            // Handle any audio errors
            if (status.error) {
              console.error(`❌ Audio error for ${soundName}:`, status.error);
              Alert.alert('Audio Error', `Failed to play ${soundName}: ${status.error}`);
            }
          },
          shouldLoop // Loop both types
        );
        
        setCurrentPlayingSound(soundName);
        setIsPlaying(true);
        
        if (!isAmbientSound) {
          // Auto-stop wake tones after exactly 15 seconds
          const timeout = setTimeout(async () => {
            console.log('Auto-stopping wake tone after 15 seconds');
            await audioManager.stopSound();
            setIsPlaying(false);
            setPlaybackProgress(0);
            setCurrentPlayingSound(null);
            setPlaybackTimeout(null);
          }, 15000);
          
          setPlaybackTimeout(timeout);
        }
        // Ambient sounds play infinitely - no timeout
      }
    } catch (error) {
      console.error('Error handling audio playback:', error);
      Alert.alert('Playback Error', 'Unable to play audio. Please check if the audio file exists.');
    }
  };

  const handleDropdownSave = (soundName) => {
    console.log(`Saving ${soundName}`);
    if (selectedTab === 'Wake Tones') {
      setCurrentWakeTone(soundName);
    } else {
      setCurrentAmbientSound(soundName);
    }
    setOpenDropdown(null); // Close dropdown after saving
  };

  const handleDropdownClose = async () => {
    // Stop audio when closing dropdown
    if (isPlaying) {
      await audioManager.stopSound();
      setIsPlaying(false);
      setPlaybackProgress(0);
      setCurrentPlayingSound(null);
    }
    
    // Clear timeout if exists
    if (playbackTimeout) {
      clearTimeout(playbackTimeout);
      setPlaybackTimeout(null);
    }
    
    setOpenDropdown(null); // Close dropdown
  };

  const handleForceStop = async () => {
    console.log('🚨 Force stopping all audio');
    try {
      // Force stop everything
      await audioManager.stopSound();
      setIsPlaying(false);
      setPlaybackProgress(0);
      setCurrentPlayingSound(null);
      if (playbackTimeout) {
        clearTimeout(playbackTimeout);
        setPlaybackTimeout(null);
      }
      console.log('✅ Force stop completed');
    } catch (error) {
      console.error('❌ Error during force stop:', error);
      // Force reset state even if stop fails
      setIsPlaying(false);
      setPlaybackProgress(0);
      setCurrentPlayingSound(null);
      if (playbackTimeout) {
        clearTimeout(playbackTimeout);
        setPlaybackTimeout(null);
      }
    }
  };

  const handleApplyPress = async () => {
    // Stop any playing audio when applying selection
    if (isPlaying) {
      await audioManager.stopSound();
      setIsPlaying(false);
      setPlaybackProgress(0);
      setCurrentPlayingSound(null);
      if (playbackTimeout) {
        clearTimeout(playbackTimeout);
        setPlaybackTimeout(null);
      }
    }
    
    if (selectedTab === 'Wake Tones') {
      console.log(`Applied wake tone: ${currentWakeTone}`);
      await saveWakeTone(currentWakeTone);
      Alert.alert(
        'Wake Tone Saved!',
        `${currentWakeTone} will now be used as your wake up sound.`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Optionally navigate back to previous screen
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }
          }
        ]
      );
    } else {
      console.log(`Applied ambient sound: ${currentAmbientSound}`);
      await saveAmbientSound(currentAmbientSound);
      Alert.alert(
        'Ambient Sound Saved!',
        `${currentAmbientSound} will now be used as your ambient sound.`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Optionally navigate back to previous screen
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }
          }
        ]
      );
    }
  };

  const handleHomePress = async () => {
    console.log('Home tab pressed');
    
    // Stop any playing audio when navigating away
    if (isPlaying) {
      await audioManager.stopSound();
      setIsPlaying(false);
      setPlaybackProgress(0);
      setCurrentPlayingSound(null);
      if (playbackTimeout) {
        clearTimeout(playbackTimeout);
        setPlaybackTimeout(null);
      }
    }
    
    if (navigation) {
      navigation.navigate('Home');
    }
  };

  const handleHistoryPress = async () => {
    console.log('History tab pressed');
    
    // Stop any playing audio when navigating away
    if (isPlaying) {
      await audioManager.stopSound();
      setIsPlaying(false);
      setPlaybackProgress(0);
      setCurrentPlayingSound(null);
      if (playbackTimeout) {
        clearTimeout(playbackTimeout);
        setPlaybackTimeout(null);
      }
    }
    
    if (navigation) {
      navigation.navigate('NapHistory');
    }
  };

  const handleFeaturesPress = async () => {
    console.log('Features tab pressed');
    
    // Stop any playing audio when navigating away
    if (isPlaying) {
      await audioManager.stopSound();
      setIsPlaying(false);
      setPlaybackProgress(0);
      setCurrentPlayingSound(null);
      if (playbackTimeout) {
        clearTimeout(playbackTimeout);
        setPlaybackTimeout(null);
      }
    }
    
    if (navigation) {
      navigation.navigate('Features');
    }
  };

  const handleProfilePress = async () => {
    console.log('Profile tab pressed');
    
    // Stop any playing audio when navigating away
    if (isPlaying) {
      await audioManager.stopSound();
      setIsPlaying(false);
      setPlaybackProgress(0);
      setCurrentPlayingSound(null);
      if (playbackTimeout) {
        clearTimeout(playbackTimeout);
        setPlaybackTimeout(null);
      }
    }
    
    if (navigation) {
      navigation.navigate('Profile');
    }
  };

  const wakeToneCards = [
    { 
      name: 'Soft Chime', 
      icon: <SoftChimeIcon />, 
      duration: '00:30',
      audioPath: require('../assets/audio/wake-tones/windchimes.wav')
    },
    { 
      name: 'Calm Bell', 
      icon: <BellIcon />, 
      duration: '00:30',
      audioPath: require('../assets/audio/wake-tones/calmbell.wav')
    },
    { 
      name: 'Gentle Breeze', 
      icon: <WindIcon />, 
      duration: '00:30',
      audioPath: require('../assets/audio/wake-tones/gentlebreeze.mp3'),
      shouldLoop: true // This will loop to reach 30 seconds
    },
    { 
      name: 'Morning Birds', 
      icon: <BirdIcon />, 
      duration: '00:30',
      audioPath: require('../assets/audio/wake-tones/morningbirds.wav')
    },
    { 
      name: 'Ocean Surf', 
      icon: <WaveIcon />, 
      duration: '00:30',
      audioPath: require('../assets/audio/wake-tones/oceansurf.wav')
    },
    { 
      name: 'Rainforest', 
      icon: <LeafIcon />, 
      duration: '00:30',
      audioPath: require('../assets/audio/wake-tones/rainforest.mp3')
    }
  ];

  const ambientSoundCards = [
    { 
      name: 'Rain', 
      icon: <RainIcon />, 
      duration: '∞',
      audioPath: require('../assets/audio/ambient/rainambient.wav')
    },
    { 
      name: 'Fireplace', 
      icon: <FireIcon />, 
      duration: '∞',
      audioPath: require('../assets/audio/ambient/fireplace.wav')
    },
    { 
      name: 'Ocean Waves', 
      icon: <OceanWavesIcon />, 
      duration: '∞',
      audioPath: require('../assets/audio/ambient/oceanwavesambient.mp3')
    },
    { 
      name: 'Night Crickets', 
      icon: <MoonIcon />, 
      duration: '∞',
      audioPath: require('../assets/audio/ambient/cricketambient.wav')
    },
    { 
      name: 'White Noise', 
      icon: <WhiteNoiseIcon />, 
      duration: '∞',
      audioPath: require('../assets/audio/ambient/whitenoise.wav')
    }
  ];

  const currentSoundCards = selectedTab === 'Wake Tones' ? wakeToneCards : ambientSoundCards;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sounds & Alarms</Text>
        </View>

        {/* Toggle Chips */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleChip,
              selectedTab === 'Wake Tones' ? styles.toggleChipActive : styles.toggleChipInactive
            ]}
            onPress={() => handleTabPress('Wake Tones')}
          >
            <Text style={[
              styles.toggleChipText,
              selectedTab === 'Wake Tones' ? styles.toggleChipTextActive : styles.toggleChipTextInactive
            ]}>
              Wake Tones
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleChip,
              selectedTab === 'Ambient' ? styles.toggleChipActive : styles.toggleChipInactive
            ]}
            onPress={() => handleTabPress('Ambient')}
          >
            <Text style={[
              styles.toggleChipText,
              selectedTab === 'Ambient' ? styles.toggleChipTextActive : styles.toggleChipTextInactive
            ]}>
              Ambient
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ambient Sound Explanation Text */}
        {selectedTab === 'Ambient' && (
          <View style={styles.ambientExplanationContainer}>
            <Text style={styles.ambientExplanationText}>
              Ambient noises are played until it's detected that user has fallen asleep if selected.
            </Text>
          </View>
        )}

        {/* Sound Cards Grid with Inline Dropdown */}
        <View style={styles.soundGrid}>
          {currentSoundCards.map((sound, index) => (
            <Fragment key={index}>
              {/* Only show the sound card if it's not the currently open dropdown */}
              {openDropdown !== sound.name && (
                <TouchableOpacity
                  style={styles.soundCard}
                  onPress={() => handleSoundPress(sound.name)}
                  activeOpacity={0.8}
                >
                  <View style={styles.soundIconContainer}>
                    {sound.icon}
                  </View>
                  <Text style={styles.soundCardTitle}>{sound.name}</Text>
                  <View style={styles.chevronContainer}>
                    <ChevronRightIcon />
                  </View>
                </TouchableOpacity>
              )}
              
              {/* Show dropdown inline after clicked sound card */}
              {openDropdown === sound.name && (
                <View style={styles.inlineDropdownWrapper}>
                  <WakeToneDropdown
                    title={openDropdown}
                    duration={selectedTab === 'Wake Tones' 
                      ? wakeToneCards.find(s => s.name === openDropdown)?.duration || '03:00'
                      : ambientSoundCards.find(s => s.name === openDropdown)?.duration || '∞'
                    }
                    icon={selectedTab === 'Wake Tones' 
                      ? wakeToneCards.find(s => s.name === openDropdown)?.icon
                      : ambientSoundCards.find(s => s.name === openDropdown)?.icon
                    }
                    playbackProgress={currentPlayingSound === openDropdown ? playbackProgress : 0}
                    isPlaying={isPlaying && currentPlayingSound === openDropdown}
                    isAmbientSound={selectedTab === 'Ambient Sounds'}
                    onPlay={() => handleDropdownPlay(openDropdown)}
                    onSave={() => handleDropdownSave(openDropdown)}
                    onClose={handleDropdownClose}
                  />
                </View>
              )}
            </Fragment>
          ))}
        </View>

        {/* Current Selection Bar */}
        <View style={styles.currentToneBar}>
          <Text style={styles.currentToneText}>
            {selectedTab === 'Wake Tones'
              ? `Current wake tone: ${currentWakeTone}`
              : `Current ambient sound: ${currentAmbientSound}`
            }
          </Text>
          <View style={styles.actionButtonsContainer}>
            {isPlaying && (
              <TouchableOpacity style={styles.stopButton} onPress={handleForceStop}>
                <Text style={styles.stopButtonText}>Stop Audio</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyPress}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.navButton} onPress={handleHomePress}>
            <HomeIcon />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleHistoryPress}>
            <ClockIcon />
            <Text style={styles.navText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleFeaturesPress}>
            <View style={styles.featuresIcon}>
              <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path d="M10 0L12.5 7.5H20L14.5 12L16.5 20L10 15L3.5 20L5.5 12L0 7.5H7.5L10 0Z" fill="#B7AFC5" />
              </Svg>
            </View>
            <Text style={styles.navTextActive}>Features</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleProfilePress}>
            <ProfileIcon />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Space for bottom navigation
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 26,
    paddingBottom: 20,
    position: 'relative',
    height: 92,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 37,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerTitle: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    flex: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 92,
    marginBottom: 14,
    paddingBottom: 8,
  },
  toggleChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 9999,
    borderWidth: 2,
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleChipActive: {
    borderColor: '#B7AFC5',
    backgroundColor: 'rgba(183, 175, 197, 0.20)',
  },
  toggleChipInactive: {
    borderColor: '#B7AFC5',
    backgroundColor: 'transparent',
  },
  toggleChipText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  toggleChipTextActive: {
    color: '#E5E7EB',
  },
  toggleChipTextInactive: {
    color: '#B7AFC5',
  },
  ambientExplanationContainer: {
    paddingHorizontal: 16,
    paddingVertical: 0,
    marginTop: -20,
    marginBottom: 2,
    alignItems: 'center',
  },
  ambientExplanationText: {
    color: '#B7AFC5',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  dropdownWrapper: {
    paddingHorizontal: 16,
    marginBottom: 32,
    alignItems: 'center',
  },
  inlineDropdownWrapper: {
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
    alignItems: 'center',
    flexBasis: '100%',
  },
  soundGrid: {
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 16,
  },
  soundCard: {
    width: '100%',
    height: 64,
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  soundIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    marginRight: 12,
  },
  soundCardTitle: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    flex: 1,
  },
  chevronContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  playButton: {
    width: 28,
    height: 28,
    backgroundColor: '#B7AFC5',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 1.5,
  },
  currentToneBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    height: 64,
    gap: 12,
  },
  currentToneText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  stopButton: {
    backgroundColor: '#dc3545',
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  stopButtonText: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  applyButton: {
    backgroundColor: '#B7AFC5',
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    width: 88,
    height: 40,
  },
  applyButtonText: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bottomNavigation: {
    backgroundColor: '#1E2A38',
    borderTopWidth: 1,
    borderTopColor: 'rgba(229, 232, 236, 0.20)',
    paddingVertical: 8,
    position: 'absolute',
    bottom: 6,
    left: 0,
    right: 0,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  featuresIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTextActive: {
    color: '#B7AFC5',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
  },
  navText: {
    color: 'rgba(253, 253, 253, 0.60)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
  },
});
