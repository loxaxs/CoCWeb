import { TAIL_TYPE_NONE, VAGINA_WETNESS_SLAVERING } from "../../../../includes/appearanceDefs";
import { BaseContent } from "../../../BaseContent";
import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { PregnancyStore } from "../../../PregnancyStore";

export class FrogGirlScene extends BaseContent {
    // const TIMES_ENCOUNTERED_FROG: number = 1017;
    // Intro
    public findTheFrogGirl(): void {
        this.clearOutput();
        if (this.flags[kFLAGS.TIMES_ENCOUNTERED_FROG] == 0) {
            this.outx(
                "You begin your trudge through the bog, slogging through the soupy muck.  Insects buzz by every second, spinning in hectic spirals around your head."
            );
            this.outx(
                "\n\nYou soon become aware of a new sound behind the buzzing - a musical chirping.  Step by step, you move toward it, pushing aside hanging curtains of gray moss until the dark trees of the swamp give way to the wide roots of mangroves.  The sporadic notes trickle into your ears, and you feel unusually relaxed as you move toward their source."
            );
            this.outx(
                "\n\nThe wide roots of the trees create separate, tiny ponds, where it looks like condensed water has collected into pools of pristine, blue water.  The chirping echoes from the high walls of mangrove roots, coming from a slim figure seated in the largest pool.  Vaguely feminine, it sits cross-legged and waist-deep in the pool, arms open wide and welcoming.  Light glints off the smooth skin of the lithe form as her lips part, issuing out another stream of alluring, musical notes."
            );
            this.outx(
                "\n\nYou move closer, climbing up a low terrace of crystal-clear pools, your [feet] knocking against the chalk-white wood of the mangrove.  Nearer to the source, the sunlit glare is less intense and the singer comes into sudden focus."
            );
            this.outx(
                "\n\nWith lime green skin and a white underbelly, she most resembles a frog, even down to a slippery sheen coating her from head to toe.  Despite a clearly feminine frame, her pearly-white chest is completely flat and bereft of nipples.  Yellow and red marks pattern her, spotting their way down her limbs.  Her arms end in oddly-wide hands, with broadened circular tips.  One set of fingers tugs back a hanging fringe of pink hair, and large yellow eyes blink brightly at you from beneath it."
            );
            this.outx(
                "\n\nShe purses her lips, blowing out another stream of oddly alluring notes, and they float through the air, wrapping around your head and submerging you in a heady, musical fog.  Despite yourself, you feel your eyes half-close as the musical notes ripple through your brain."
            );
            this.outx(
                "\n\nShe smiles, a three-foot tongue uncoiling from her mouth, trailing down over her flat chest, a patina of slime smearing across her torso.  With one upraised hand, she crooks a finger towards you, beckoning you closer to her pool."
            );
        } else {
            this.outx(
                "While exploring the bog, you become aware of a familiar sound behind the buzzing— a musical chirping.  Step by step, you move toward it, pushing aside hanging curtains of gray moss until the dark trees of the swamp give way to the wide roots of mangroves.  The sporadic notes trickle into your ears, and you feel unusually relaxed as you move toward their source."
            );
            this.outx(
                "\n\nThe wide roots of the trees create separate, tiny ponds, where it looks like condensed water has collected into pools of pristine, blue water.  The chirping echoes from the high walls of mangrove roots, coming from a slim, familiar figure seated in the largest pool.  The frog-girl sits cross-legged and waist-deep in the pool, arms open wide and welcoming.  Light glints off the smooth skin of the lithe form as her lips part, issuing out another stream of alluring, musical notes."
            );
            this.outx(
                "\n\nYou move closer, climbing up a low terrace of crystal-clear pools, your [feet] knocking against the chalk-white wood of the mangrove.  Nearer to the source, the sunlit glare is less intense and the singer comes into sudden focus."
            );
            this.outx(
                "\n\nShe purses her lips, blowing out another stream of oddly alluring notes, and they float through the air, wrapping around your head and submerging you in a heady, musical fog.  Despite yourself, you feel your eyes half-close as the musical notes ripple through your brain."
            );
            this.outx(
                "\n\nShe smiles, a three-foot tongue uncoiling from her mouth, trailing down over her flat chest, a patina of slime smearing across her torso.  With one upraised hand, she crooks a finger towards you, beckoning you closer to her pool."
            );
        }
        this.flags[kFLAGS.TIMES_ENCOUNTERED_FROG]++;
        this.outx(
            "\n\nDo you follow the music into the arms of the frog girl, or resist her melody?"
        );
        this.menu();
        this.addButton(0, "Follow", this.followDatFrog);
        this.addButton(1, "Resist", this.resistDatFrog);
    }

    // Follow:
    private followDatFrog(): void {
        this.clearOutput();
        this.outx(
            "You splash your way up the terrace of pools, shedding your [armor] as you do so, leaving your gear draped over the mangrove ridges.  She holds her arms out to you as you step naked into her pool.  She rises to meet you, and you notice that the water concealed a swollen, pregnant belly."
        );
        this.outx(
            "\n\nHer skin is slimy to the touch, and as she pulls you in close, she leaves her ichor on your arms and [chest].  It tingles where it touches you, and the sunlight seems to grow a bit brighter around you.  Her song continues, and you swear that you can see the music floating in the air, every different note a different neon light drifting through the air.  Half focused, your eyes dart back and forth, tracking the tiny motes of light."
        );
        this.outx("\n\nHer round belly rubs against ");
        if (this.player.hasCock()) this.outx("[eachCock]");
        else if (this.player.hasVagina()) this.outx("your [vagina]");
        else this.outx("your bare but sensitive groin");
        this.outx(
            " as she raises her fingertips to your lips.  Entranced by her song, you open your mouth, taking her in.  The thin layer of slime on it tastes citrusy and sweet, and another heady rush clouds your conscious mind.  The colors of her song drift more intensely through the air, and you smile bemusedly as she pushes you back, letting you rest against the root wall, floating comfortably in the water."
        );
        this.outx(
            "\n\nYour arms drape over the lip of the pool as she smiles, stroking your cheek, sending another rush of colors and lights through your head.  Drugged and relaxed, you let your [legs] drift lazily in the pool as the frog girl smiles, biting her lower lip mischievously."
        );
        this.outx(
            '\n\n"<i>Sorry about the bait and switch, Sparkles, but I need someone else to carry these for me...</i>" she says, patting her heavy, pregnant belly.  "<i>But I’m sure you’ll love every minute of it.</i>"'
        );
        this.outx("\n\nHer words raise red flags, and you try to push up against her.");
        this.outx(
            '\n\n"<i>Nope nope nope...</i>" she coos, her slick hands splay across your [chest].  Her cool, slippery lips press against yours, and her tongue, slathered in even more hallucinogenic ooze, forces its way into your surprised mouth.  The ridiculously-long organ pushes deep into you, sliding its way down your throat.  You swallow reflexively, taking in a startling large helping of her slimy goo.'
        );
        this.outx(
            "\n\nShe pulls away from the kiss, leaving a long strand of saliva between her lips and yours.  The frog girl smirks, and you giggle, wanting to ask her what’s so funny.  Before you can, though, an intense wave of shuddering pleasure roars through you.  Beginning in your [feet], it thunders up through your body, feeling like an orgasm for every nerve ending.  It could be seconds or hours before it reaches your drug-addled brain, but you’re so far beyond counting or caring."
        );
        this.outx(
            "\n\nYou lay back, shuddering in the water, mouth agape as your eyes focus loosely on the frog girl over you.  Your vision is full of colors and as she opens her mouth to sing again, nebulas of colors and sounds saturating the very air."
        );
        this.outx(
            '\n\n"<i>Feeling better now?</i>" she asks, as the world dissolves into colors with no name.  Her voice bizarrely echoes across the surface of the pool.'
        );
        this.outx(
            "\n\nCompletely lost in sensation, you pant as you feel slick fingers working at your [asshole], under the water.  Lovely, fluttery sensations accent your high as the frog girl takes a position between your legs.  A cool softness presses against your asshole, and some kind of thick goo adheres it to your twitching hole."
        );
        this.outx(
            "\n\nYou cross and uncross your eyes, trying to focus on the frog girl as she grips your hips adjusting herself.  She’s in some kind of scissoring pose, her pussy glued to your asshole.  With a grunt, she wraps her arms around her pale belly, hugging herself.  You feel her soft pussy twitching against you as something gooey and large pushes against your bud."
        );
        this.outx(
            '\n\n"<i>Anh!  Unnnh!</i>" she moans, shuddering and bearing down on her pregnant belly.  A round, gooey mass oozes from her cunt, stretching your asshole as it moves into you.'
        );
        this.player.buttChange(30, true, true, false);
        this.outx(
            "\n\nYou giggle drunkenly to yourself as a frog egg the size of an apple squeezes inside you.  If you weren’t so lost in mind-bending pleasure, you might be concerned at the pressure.  Instead, you just feel more dizzy - those eggs must be lubed with the frog girl’s slime - and with one inside you, the world begins to spin."
        );
        this.outx(
            '\n\n"<i>One down...</i>" the frog girl hisses through gritted teeth.  But you can’t find the wherewithal to even raise an eyebrow at her words.  Pressure builds again against your asshole, and the frog girl pushes another massive, squishy egg into you.  "<i>Unff!</i>" she grunts, shaking with the effort of forcing her eggs into your body.'
        );
        this.outx(
            "\n\nYou giggle again, loving the way the world spins with every egg fed into you.  She lays egg after egg into you.  It’s finally too much for you and your mind collapses.  The world completely dissolves into a swirling collage of color, sensation, and sound."
        );
        this.player.orgasm();
        this.dynStats("sen", 1);
        this.menu();
        this.addButton(0, "Next", this.getFrogButtFilled);
    }
    private getFrogButtFilled(): void {
        this.clearOutput();
        this.outx(
            "You wake up an hour later and it takes a while for you remember anything.  Gradually, you piece the last hour together, remembering the frog girl, her hypnotic song, and hallucinogenic slime.  You’re floating on your back in a crystal-clear pool, and above you, between the mangrove canopies, Mareth’s sky drifting lazily far overhead."
        );
        this.outx(
            "\n\nAnd the eggs.  Oh hell, the eggs!  You splash in the water, righting yourself and looking down at your swollen belly.  You look nine months pregnant!  The frog girl filled you with her eggs and took off leaving you to birth them.  You can’t seem to force them out, either - it looks like you’ll just have to carry these eggs to term."
        );
        this.outx(
            "\n\nWrapping your arms under your heavy belly, you clamber out of the pool.  Water sluices down your naked body, leaving the last of the slime behind you in the no-longer pristine water."
        );
        this.outx(
            "\n\nYou don your [armor] with some difficulty over your massive stomach, and venture back towards your camp, a little sore, but wiser for the ordeal."
        );
        this.dynStats("int", 1);
        this.player.buttKnockUp(
            PregnancyStore.PREGNANCY_FROG_GIRL,
            PregnancyStore.INCUBATION_FROG_GIRL,
            1,
            1
        );
        this.doNext(this.camp.returnToCampUseTwoHours);
    }

    // [Anal stretch +1/Anal Moistness +1, sensitivity +1, int +1]

    // Resist:
    private resistDatFrog(): void {
        this.clearOutput();
        this.outx(
            "You shake your head and drop to the ground, dunking your head in one of the crystal clear pools.  You emerge with your head clear, cold water dripping from your [hair], frowning at the frog girl."
        );
        this.outx(
            "\n\nRealizing that you’ve shaken off her hypnosis, the frog girl gulps, the action producing a curious croaking noise.  As you stomp up the terrace, she scrambles up out of the pool, or at least attempts to."
        );
        this.outx(
            "\n\nShe’s weighed down by a massively pregnant belly, the size of a beachball, pale as the moon and glistening with amphibian slime.  She hauls herself out of deep pool, only to slip back down into it with a splash."
        );
        this.outx(
            "\n\nYou stand at the lip of the pool, and glare down at her, demanding an explanation."
        );
        this.outx(
            '\n\n"<i>Okay, geeze, sorry,</i>" she says, holding up her wide-fingered palms.  "<i>Sorry - I’m done, no harm, no foul.  Be on your way</i>"'
        );
        this.outx(
            "\n\nShe wrinkles up her noseless face and slouches down into the water, sinking down until it reaches the bottoms of her eyes, huffing out a bubbling sigh."
        );
        this.outx(
            "\n\nYou admit to being a bit curious as to why she attempted to lure you in, but you do have your own tasks at hand.  On the other hand, she did just try to lure you in for unwanted sex.  Are you just going to let her get away with that?  Do you question the frog girl, continue on your way, or teach her a lesson?"
        );
        this.menu();
        this.addButton(0, "Question", this.questDatFrogGirl);
        this.addButton(1, "TeachLesson", this.teachDatFrogALesson);
        this.addButton(4, "Leave", this.leaveFrogBe);
    }
    // Leave her be:
    private leaveFrogBe(): void {
        this.clearOutput();
        this.outx(
            "You shrug and leave the pouting frog girl in her pond, hopping back down the terrace of pools and walking back towards your camp, hoping that your [hair] will dry by the time you get back."
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // Question the frog girl:
    private questDatFrogGirl(): void {
        this.clearOutput();
        this.outx(
            "You decide to question the pouting amphibian and take a seat at the edge of her pool, asking her why she just tried to lure you in."
        );
        this.outx(
            '\n\n"<i>I’m pregnant,</i>" she bubbles shortly, still half-sunk in the pool.  She purses her lips to one side, eyes shifting away from you.'
        );
        this.outx("\n\nYou raise an eyebrow, requesting more information than just that.");
        this.outx(
            '\n\nShe pulls herself higher out of the water, sliding back down at least twice in the process.  "<i>Hhhhhhhhhh!</i>" she sighs, exasperated, reaching behind herself, grabbing the lip of the pool, and lifting herself until the bulge of her stomach rises up like a tiny island.  "<i>I’m pregnant, and I’m sick of it!</i>" she snaps, frowning at her belly.'
        );
        this.outx(
            "\n\nYou gesture for more information from the cranky, flat-chested mother-to-be."
        );
        this.outx(
            '\n\n"<i>I produce eggs WAY too quickly,</i>" she says, idly splashing water over her massive stomach.  "<i>And they’re always filling me up, and I HATE being heavy and slow.  I can’t even get out of my own pool.</i>"'
        );
        this.outx(
            '\n\n"<i>So I was gonna...</i>" she shifts her eyes from side to side quickly, "<i>...drug you... and then fill up your ass with my eggs.</i>"  She mumbles the last part quickly, apparently hoping that you won’t hear it.'
        );
        this.outx(
            '\n\nBefore you can react, she adds quickly, "<i>It wouldn’t hurt you - or the eggs - you’d just carry them for a few days until they hatch.  And then I wouldn’t have to deal with them.  It’s win-win, really!</i>"'
        );
        this.outx(
            "\n\nYou wonder what it would be like to carry the massive load of eggs. Do you want to offer to carry the frog’s eggs or continue on your way?"
        );
        this.menu();
        this.addButton(4, "Leave", this.continueOnYourWay);
        if (this.player.hasVagina())
            this.addButton(0, "Vaginally", this.superBonusFrogEggsInYerCooch);
        this.addButton(1, "Carry", this.carryBeeGirlsEggsVoluntarilyYouButtSlut);
    }

    // Continue on your way:
    private continueOnYourWay(): void {
        this.clearOutput();
        this.outx(
            "You nod in sympathy, patting the frog girl on her head, but decide not to inquire any further.  She sighs and sinks down further into the water, resigned to her maternal duties."
        );
        this.outx("\n\nYou leave down the terrace of pools, heading back to your camp.");
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Offer to carry her eggs:
    private carryBeeGirlsEggsVoluntarilyYouButtSlut(): void {
        this.clearOutput();
        this.outx("Feeling sympathy for the frog girl, you volunteer to help with her burden.");
        this.outx(
            '\n\n"<i>Omigosh, really?</i>" she says, lunging forward with a splash.  She throws her arms around your shoulders.  "<i>I promise to make it absolutely amazing for you.</i>"'
        );
        this.outx(
            "\n\nThe slime on her arms tingles against you, and as she undresses you, peeling away your [armor], she leaves slimy, tingly prints on your arms, stomach, and [chest].  As you watch her, her movements seem to leave trails of light, and the sunlight seems to grow a bit brighter around you.  She hums to herself, and you swear that you can see the music floating in the air, every different note a different neon light drifting through the air.  Half focused, your eyes dart back and forth, tracking the tiny motes of light."
        );
        this.outx("\n\nHer round belly rubs against ");
        if (this.player.hasCock()) this.outx("[eachCock]");
        else if (this.player.hasVagina()) this.outx("your [vagina]");
        else this.outx("your bare but sensitive groin");
        this.outx(
            " as she raises her fingertips to your lips.  Entranced by her song, you open your mouth, taking her in.  The thin layer of slime on it tastes citrusy and sweet, and another heady rush clouds your conscious mind.  The colors of her song drift more intensely through the air, and you smile bemusedly as she pushes you back, letting you rest against the root wall, floating comfortably in the water."
        );
        this.outx(
            "\n\nYour arms drape over the lip of the pool as she smiles, stroking your cheek, sending another rush of colors and lights through your head.  Drugged and relaxed, you let your [legs] drift lazily in the pool as the frog girl smiles, biting her lower lip mischievously."
        );
        this.outx(
            '\n\n"<i>I really do appreciate this...</i>" she says, massaging her heavy, pregnant belly.  "<i>And if you end up liking this, I’ll have another batch ready for you in a few days.</i>"'
        );
        this.outx(
            "\n\nHer slick hands splay across your [chest]. Her cool, slippery lips press against yours, and her tongue, slathered in even more hallucinogenic ooze, forces its way into your waiting mouth.  The ridiculously-long organ pushes deep into you, sliding its way down your throat.  You swallow reflexively, taking in a startling large helping of her slimy goo."
        );
        this.outx(
            "\n\nShe pulls away from the kiss, leaving a long strand of saliva between her lips and yours.  The frog girl smirks, and you giggle, wanting to ask her what’s so funny.  Before you can, though, an intense wave of shuddering pleasure quakes through you.  Beginning in your [feet], it thunders up through your body, feeling like an orgasm for every nerve ending.  It could be seconds or hours before it reaches your drug-addled brain, but you’re so far beyond counting or caring."
        );
        this.outx(
            "\n\nYou lay back, shuddering in the water, mouth agape as your eyes focus loosely on the frog girl over you.  Your vision is full of colors and as she opens her mouth to sing again, nebulas of colors and sounds saturating the very air."
        );
        this.outx(
            '\n\n"<i>Oooh, you liked that, didn’t you?</i>" she asks, as the world dissolves into colors with no name.  Her voice bizarrely echoes across the surface of the pool.'
        );
        this.outx(
            "\n\nCompletely lost in sensation, you pant as you feel slick fingers working at your [asshole], under the water.  Lovely, fluttery sensations accent your high as the frog girl takes a position between your legs.  A cool softness presses against your asshole, and some kind of thick goo slathers across your twitching hole."
        );
        this.player.buttChange(20, true, true, false);
        this.outx(
            "\n\nYou cross and uncross your eyes, trying to focus on the frog girl as she grips your hips adjusting herself.  She’s in some kind of scissoring pose, her pussy glued to your asshole.  With a grunt, she wraps her arms around her pale belly, hugging herself.  You feel her soft pussy twitching against you as something gooey and large pushes against your bud."
        );
        this.outx(
            '\n\n"<i>Anh!  Unnnh!</i>" she moans, shuddering and bearing down on her pregnant belly.  A round, gooey mass oozes from her cunt, stretching your asshole as it moves into you.'
        );
        this.outx(
            "\n\nYou giggle drunkenly to yourself as a frog egg the size of an apple squeezes inside you.  If you weren’t so lost in mind-bending pleasure, you might be concerned at the pressure.  Instead, you just feel more dizzy - those eggs must be lubed with the frog girl’s slime - and with one inside you, the world begins to spin."
        );
        this.outx(
            '\n\n"<i>One down...</i>" the frog girl hisses through gritted teeth.  But you can’t find the wherewithal to even raise an eyebrow at her words.  Pressure builds again against your asshole, and the frog girl pushes another massive, squishy egg into you.  "<i>Unff!</i>" she grunts, shaking with the effort of forcing her eggs into your body.'
        );
        this.outx(
            "\n\nYou giggle again, loving the way the world spins with every egg fed into you.  She lays egg after egg into you.  It’s finally too much for you and your mind collapses.  The world completely dissolves into a swirling collage of color, sensation, and sound."
        );
        this.player.orgasm();
        this.dynStats("sen", 1);
        this.menu();
        this.addButton(0, "Next", this.voluntarilyGetEggedEpilogue);
    }
    // **
    private voluntarilyGetEggedEpilogue(): void {
        this.clearOutput();
        this.outx(
            "You wake up an hour later and it takes a while for you remember anything.  Gradually, you piece the last hour together, remembering the frog girl, her hypnotic song, and hallucinogenic slime.  You’re floating on your back in a crystal-clear pool, and above you, between the mangrove canopies, Mareth’s sky drifting lazily far overhead."
        );
        this.outx(
            "\n\nAnd the eggs.  Oh hell, the eggs!  You splash in the water, righting yourself and looking down at your swollen belly.  You look nine months pregnant!  The frog girl really took you up on your offer and you belly bulges out uncomfortably.  You can’t seem to force them out, either - it looks like you’ll just have to carry these eggs to term."
        );
        this.outx(
            "\n\nWrapping your arms under your heavy belly, you clamber out of the pool.  Water sluices down your naked body, leaving the last of the slime behind you in the no-longer pristine water."
        );
        this.outx(
            "\n\nYou don your [armor] with some difficulty over your massive stomach, and venture back towards your camp, feeling a little sore, but proud of yourself for helping out a mother in need."
        );
        // [Anal stretch +1/Anal Moistness +1, sensitivity +1, corruption -1]
        this.player.buttKnockUp(
            PregnancyStore.PREGNANCY_FROG_GIRL,
            PregnancyStore.INCUBATION_FROG_GIRL,
            1,
            1
        );
        this.dynStats("sen", 1, "cor", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // Teach Her a Lesson
    private teachDatFrogALesson(): void {
        this.clearOutput();
        this.outx("This frog bitch needs to be careful about who she lures in.");
        this.outx(
            "\n\nYou say so, and hop down into the water, sinking waist-deep, striding forward toward the frog girl, grabbing her by the wrist.  Slowed down by her pregnancy, it seems that she can do little to resist."
        );
        this.outx(
            "\n\nYour hand tingles, but that’s not going to stop you from bending this frog girl over and fucking her hard in the purple-orange water... under the trees made out of bread... and with dildos?"
        );
        this.outx(
            "\n\nYou stagger back, clutching your head, accidentally smearing the slime on your hand across your face.  Why can you... hear colors?"
        );
        this.outx(
            "\n\nThe frog girl glowers at you from across the pool.  She looks like a kaleidoscope of angry colors, all swirling around.  Faster than your eyes can follow, her tongue lashes through the air, slapping wetly into your face."
        );
        this.outx(
            "\n\nThere’s no actual pain to it, just more slime, and you grasp at the edge of the tree pool to steady yourself as the world turns sideways.  You close your eyes for a moment to try to make the world stop spinning, and sink down in the pool."
        );
        this.outx(
            '\n\nWhen you open your eyes again, the frog girl is standing over you.  The sky behind her looks like it’s on fire, and she’s covered in spinning lights.  "<i>Okay, I’ll admit, I’m a terrible mother, but I’m pretty sure you’d be worse,</i>" she huffs, slapping her tongue against your face once more.'
        );
        this.outx(
            "\n\nColors, lights, and sounds erupt, and you black out, unable to take any more."
        );
        this.menu();
        this.addButton(0, "Next", this.lessonFollowup);
    }

    private lessonFollowup(): void {
        this.clearOutput();
        this.outx(
            "You wake up two hours later, floating alone in the pool, with a migraine and soggy clothes.  You slog your way out, clutching your head, and head back to camp."
        );
        // [Toughness -1]
        this.dynStats("tou", -1);
        this.doNext(this.camp.returnToCampUseTwoHours);
    }

    // Laying the Eggs
    public birthFrogEggsAnal(): void {
        this.outx(
            "\n<b>Oh no...</b>\nYou groan, feeling a shudder from deep inside, a churning from your gut.  A trickle of slime leaks from your [asshole] down your [legs] and you feel a pressure from deep inside."
        );
        this.outx(
            "\n\nWater - you need to be near water!  The instinct is sudden and clear, and you stagger toward the small creek near your camp.  You crouch low on the river bank, hands on the ground, and knees angled up in an oddly frog-like pose."
        );
        this.outx(
            "\n\nSlime pools beneath you, running down into the water as he first egg begins shoving out of you.  It feels... weird.  The pressure isn’t as intense as some of the things you’ve encountered in Mareth, but it’s still incredibly large.  Your asshole stretches wide, numbed a bit by the slime, but still far larger than you would have thought possible.  As the egg squelches to the ground, you realize that the eggs are jelly-like, and pliant enough to give you some leeway in laying them."
        );
        this.outx(
            "\n\nThe first egg rolls down into the water, anchored by the pooling slime, but you can’t spare it more than a moment’s glance.  The next egg pushes against you, and you groan, shuddering and panting as you try to force it out.  Your asshole aches with every lurch of your body, but finally, the second watermelon-sized egg wobbles free from your ass.  You’re already exhausted as you feel the next one coming, but you manage to force this one out, too, collapsing face-forward onto the ground."
        );
        this.player.buttChange(80, true, true, false);
        this.outx(
            "\n\nNature pushes onward, though, and your body works to push the next egg out.  You moan, only half conscious, the frog slime on your skin once again lifting you into a state of hazy awareness as egg after egg pushes out of your body."
        );
        this.outx(
            "\n\n<b>Later, you wake up to the sound of splashing....</b>\nIn the river are a dozen tiny figures, each no more than a foot long, and each one a mirror of the frog girl from the waist-up, but oddly featureless from the waist-down. Their lower halves ending in vaguely-finned tails, like tadpoles."
        );
        this.outx(
            "\n\nThe tadgirls splash each other, playing in the water, but take notice as you wake up.  It seems that they were waiting for you - displaying a level of concern that their original mother lacked.  Maybe they got that from you?  They wave and swim away downstream, and you notice that a few of them have a few unusual splashes of color in their hair and skin, looking a bit more like you than their mother."
        );
        this.outx(
            "\n\nYou nod to yourself, happy to be finished with that ordeal.  As you stand, you notice a bit of heaviness to your hips, and some added slickness to your asshole.\n"
        );
        // [Anal moistness +2, Hips +1]
        this.player.hipRating++;
        this.player.ass.analWetness += 1;
        if (this.player.ass.analWetness > 5) this.player.ass.analWetness = 5;
        this.player.orgasm();
        this.dynStats("sen", 1);
    }
    // Superbonus Vaginal Eggs!
    private superBonusFrogEggsInYerCooch(): void {
        this.clearOutput();
        this.outx('"<i>Wait, you want them where?</i>" asks the frog girl, incredulously.');
        this.outx(
            "\n\nYou repeat that you’d like her to lay her clutch in your womb, licking your lips and running your fingers down to your [vagina]."
        );
        this.outx(
            '\n\n"<i>Huh, now why didn’t I think of that?</i>" mutters the frog girl, furrowing her brow.  "<i>It’s a fantastic idea, though,</i>" she chirps.  "<i>I just need you in the right position.</i>"'
        );
        this.outx(
            "\n\nShe leans in against you, her lips brushing against yours as her broad hand slides behind you, her cool touch leaving a patina of tingling slime against your back.  You arch your back reflexively, feeling pleasant tingles running from your [face] all the way down to your [legs]."
        );
        this.outx(
            "\n\nAs the small of your back pushes up, your hips rise up in the water, guided by the frog girl’s light touches across your [ass].  Every fingertip sends hallucinogens through your system, making the world light up, spin, or fill with tiny motes of light.  By the time she slings a smooth thigh over your [leg], you’re giggling at the kaleidoscopic universe unfolding before you."
        );
        this.outx(
            "\n\nYou hear the frog girl coo as she touches her pussy against yours, smearing her slickness against your mound.  Her touch sends shivery, silvery sensations up your spine, and you feel your own wetness oozing out against her."
        );
        this.outx(
            "\n\nThicker slime adheres her pussy to yours, making every grind and shove a shared sensation. As she squeezes down on her belly, pressure builds against your opening, and her pussy lips spread against yours, parting you open to take the first of her eggs.  As the jelly-like mass over her egg begins to squeeze into you, the world goes purple, then blue, then the water around you seems to rise slowly up into the air."
        );
        this.outx(
            "\n\nIf you could think clearly at this point, you would attribute this to the mind-bending frog slime, but all you can think about is the sensation of your pussy spreading wider and wider, taking in another goo-covered egg.  The frog girl’s thighs clamp around you, one against your belly, the other"
        );
        if (this.player.tailType > TAIL_TYPE_NONE) this.outx(" hooked over your tail,");
        else this.outx(" clasped against your [ass],");
        this.outx(" smearing more and more of her slime against your body.");
        this.player.cuntChange(25, true, true, false);

        this.outx(
            "\n\nYou feel your brain turn happy little cartwheels as egg after egg pushes into you.  Somewhere along the way you cum, but you’re not even sure of that - your mind is too fogged by the hallucinogenic slime."
        );
        this.outx(
            "\n\nYou’re not sure when the frog girl finishes.  By the time the trees stop dancing and the sky stops rippling, you’re floating face-up in the pool, watching the curve of your now-swollen belly as you bob gently in the water."
        );
        this.outx(
            "\n\nAs awareness slowly starts to trickle in to your head, you blink, groaning slightly as you sit up, clutching your massive, pregnant belly, feeling the jelly-eggs inside shifting when you step up out of the water.  You pause as a tiny trickle of slime oozes out from your vagina, sending a brief rainbow flash across your vision and the echo of an orgasm through your system, before you put your [armor] back on and stagger back toward camp."
        );
        // [Vaginal wetness +1, Sensitivity +1]
        this.player.orgasm();
        this.dynStats("sen", 1);
        this.player.knockUp(
            PregnancyStore.PREGNANCY_FROG_GIRL,
            PregnancyStore.INCUBATION_FROG_GIRL,
            1,
            1
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Vaginal Egg birth
    public layFrogEggs(): void {
        if (this.player.vaginas.length == 0) {
            this.outx(
                "You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold: a vagina.  ",
                false
            );
            this.player.createVagina();
            this.player.genderCheck();
        }
        this.outx(
            "You shudder as you feel the familiar tingle of stimulant slime running down your thighs."
        );
        this.outx(
            "\n\nAs your swollen belly churns, the instinctive need for water ripples through you."
        );
        this.outx(
            "\n\nYou hustle to the banks of the campside stream as quickly as your pregnant belly will allow, splashing down waist-deep in the water.  The coolness eases your urgency as you shift your [ass] against the smooth stones of the riverbed.  Groaning, you close your eyes and clutch at your stomach, a sharp ache throbbing between your legs."
        );
        this.outx(
            "\n\nBefore the pain can fully blossom, you feel a coolness at your pussy.  The familiar tingle of frog slime slathers itself over your vagina.  Breathing easy once more, you look down to see the head of the frog girl just below the water.  Pink hair drifting lazily in the current, she bobs her head up and down between your thighs.  You let out a sigh as you feel more of her mind-bending goo adhere to your nethers."
        );
        this.outx("\n\nAs the slime begins to numb your pussy, her head bobs up out of the water.");
        this.outx(
            '\n\n"<i>I don’t often lay eggs this way,</i>" she says, slurping her tongue back into her mouth.  "<i>So I wanted to come by to make sure things were all right.</i>"'
        );
        this.outx(
            "\n\nYou’re able to thank her, briefly, before you feel an immense pressure just below your hips.  You toss your head back, surprised to find the frog girl’s hand there, cupping against your [hair]."
        );
        this.outx(
            '\n\n"<i>Easy there, love,</i>" she mutters, leaning across to press her lips against yours.  You blink in surprise as her tongue slides into your mouth.  The muscular organ writhes between your lips as her other hand rubs gently against your throat.'
        );
        this.outx(
            "\n\nYou swallow reflexively, gulping down a load of her slime.  Immediately lightheaded, you moan softly, feeling a familiar weakness in your limbs.  Her tongue snakes out of your mouth, leaving you with a trickle of goo running down your chin."
        );
        this.outx(
            '\n\n"<i>Let’s relax your muscles and free your mind, dear,</i>" says the frog girl with a smile.  You try to focus on her, but yours eyes just seem to cross and uncross on their own.  Her slick lips press against yours once more, and you feel a massive load of her slime force its way into your mouth, her muscular tongue right behind it.'
        );
        this.outx(
            "\n\nLacking the muscle control to resist, you swallow, your vision brightening with dancing motes of light and swirls of color.  You barely feel her lips pull away, but you feel the trickle of slime as it runs down your chin and onto your [chest]."
        );
        this.outx(
            "\n\nThe forest around you turns upside down as you lean forward and giggle, trying to make sense of what’s going on.  You feel your pussy stretch wider and wider, but there’s no pain, just a warm numbness and happy clouds at the corners of your eyes.  Between your legs you catch sight of the frog girl’s fingertips pushing between your lips, gently cradling large, grapefruit-sized eggs as they squish out of your body."
        );
        this.player.cuntChange(80, true, true, false);
        this.outx(
            "\n\nYou lose count of the squishy eggs passing through your vagina, distracted by the mesmerizing way they bob along in the water, anchored to the frog girl’s side."
        );
        this.outx(
            "\n\nYou don’t even remember passing out, only awaking to the familiar sound of humming.  A chorus of alluring chirrups suffuses the air as you open your eyes.  Blinking to clear your vision, you find yourself lying atop a patch of riverbank ferns."
        );
        this.outx(
            '\n\n"<i>Sorry, did we wake you up?</i>" queries the voice of the frog girl.  You push yourself up, seeing her floating mid-stream, surrounded by a half-dozen frog girl nymphs. From the waist-up, they’re miniature versions of their mother with varying haircolors, but from the waist down, they resemble large tadpoles.  No more than  few feet long, they bob along next to their mother as she conducts their song.'
        );
        this.outx(
            '\n\n"<i>I was just sticking around to make sure you were all right,</i>" she says.'
        );
        this.outx(
            "\n\nThe nymphs in the water all turn to you, their large eyes wide, ribbiting excitedly."
        );
        this.outx(
            '\n\n"<i>And to make sure you had a proper thank you,</i>" she says.  "<i>Girls?</i>"'
        );
        this.outx(
            '\n\n"<i>Thank you, Miss!</i>" they chant in unison, dissolving into giggles afterward.'
        );
        this.outx("\n\nYou smile weakly, wondering if the frog slime is still affecting you.");
        this.outx(
            '\n\n"<i>Right then!  Time for us to be off,</i>" says the frog girl.  She seems much more put together with young ones in her charge.'
        );
        this.outx(
            '\n\nTo you, she says with a wink, "<i>They won’t take long to grow up, you know - so feel free to stop by the swamp and help out with the next batch!</i>"'
        );
        this.outx(
            "\n\nWith a splash, she dives beneath the water, her brood following suit.  The ripples of their passage follow them downstream until they’re out of sight."
        );
        this.outx(
            "\n\nYou shake your head wearily as you sit up, your head still spinning slightly."
        );
        this.outx(
            "\n\nWith a wince, you head back to camp, hoping that the frog slime hasn’t affected you permanently."
        );

        // [Vaginal gape +1/Vaginal Moistness +1/Hips +1, Sensitivity +1]
        if (this.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_SLAVERING) {
            this.player.vaginas[0].vaginalWetness++;
            this.outx(
                "  It rapidly becomes clear that it has.  <b>Your pussy is wetter than ever.</b>"
            );
        }
        if (this.player.hipRating < 25) {
            this.player.hipRating++;
            this.outx("  There's an extra thickness to your [hips] as well.");
        }
        this.player.orgasm();
        this.dynStats("sen", 1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
}
