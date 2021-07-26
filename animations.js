import { gsap, Back } from 'gsap'

export const updateBounce = elem => {
    gsap.set(elem, { scale: 0 })
    gsap.to(elem, { scale: 1, duration: .3, ease: Back.easeOut });
}